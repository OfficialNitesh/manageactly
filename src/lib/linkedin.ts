// src/lib/linkedin.ts
// LinkedIn OAuth + Publishing client.
//
// Architecture notes:
// - All API calls go through the linkedin() factory which injects the access token
// - Token refresh is handled transparently — callers don't need to think about it
// - Encrypted tokens are decrypted only in-memory, never logged
// - LinkedIn API v2 is used (stable, supports UGC Posts)

import { encrypt, decrypt } from "@/lib/crypto";
import db from "@/lib/db";
import type { SocialConnection } from "@prisma/client";

const LINKEDIN_API_BASE = "https://api.linkedin.com/v2";
const LINKEDIN_AUTH_BASE = "https://www.linkedin.com/oauth/v2";

// LinkedIn OAuth scopes needed
// w_member_social: post on behalf of user
// r_liteprofile: read basic profile (for member URN)
// r_emailaddress: read email (optional)
export const LINKEDIN_SCOPES = ["openid", "profile", "email", "w_member_social"];

// ─── OAuth URL generation ────────────────────────────────────────────────────

export function getLinkedInAuthUrl(state: string): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.LINKEDIN_CLIENT_ID!,
    redirect_uri: process.env.LINKEDIN_REDIRECT_URI!,
    scope: LINKEDIN_SCOPES.join(" "),
    state,
  });

  return `${LINKEDIN_AUTH_BASE}/authorization?${params}`;
}

// ─── Token exchange ──────────────────────────────────────────────────────────

interface LinkedInTokenResponse {
  access_token: string;
  expires_in: number;       // seconds
  refresh_token?: string;
  refresh_token_expires_in?: number;
  scope: string;
}

export async function exchangeLinkedInCode(code: string): Promise<LinkedInTokenResponse> {
  const response = await fetch(`${LINKEDIN_AUTH_BASE}/accessToken`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.LINKEDIN_REDIRECT_URI!,
      client_id: process.env.LINKEDIN_CLIENT_ID!,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`LinkedIn token exchange failed: ${error}`);
  }

  return response.json();
}

// ─── Profile fetch ───────────────────────────────────────────────────────────

interface LinkedInProfile {
  sub: string;              // member URN (urn:li:member:12345)
  name: string;
  email?: string;
  picture?: string;
}

export async function getLinkedInProfile(accessToken: string): Promise<LinkedInProfile> {
  const response = await fetch(`${LINKEDIN_API_BASE}/userinfo`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch LinkedIn profile: ${response.statusText}`);
  }

  return response.json();
}

// ─── Store / refresh connection ───────────────────────────────────────────────

export async function storeLinkedInConnection(
  workspaceId: string,
  tokens: LinkedInTokenResponse,
  profile: LinkedInProfile
): Promise<SocialConnection> {
  const now = new Date();
  const accessTokenExpiresAt = new Date(now.getTime() + tokens.expires_in * 1000);
  const refreshTokenExpiresAt = tokens.refresh_token_expires_in
    ? new Date(now.getTime() + tokens.refresh_token_expires_in * 1000)
    : null;

  return db.socialConnection.upsert({
    where: {
      workspaceId_platform: { workspaceId, platform: "LINKEDIN" },
    },
    create: {
      workspaceId,
      platform: "LINKEDIN",
      platformUserId: profile.sub,
      platformUserName: profile.name,
      accessToken: encrypt(tokens.access_token),
      refreshToken: tokens.refresh_token ? encrypt(tokens.refresh_token) : null,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
      scopes: tokens.scope.split(" "),
      revokedAt: null,
    },
    update: {
      platformUserName: profile.name,
      accessToken: encrypt(tokens.access_token),
      refreshToken: tokens.refresh_token ? encrypt(tokens.refresh_token) : null,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
      scopes: tokens.scope.split(" "),
      revokedAt: null,
    },
  });
}

// ─── Token refresh ───────────────────────────────────────────────────────────

async function refreshAccessToken(connection: SocialConnection): Promise<string> {
  if (!connection.refreshToken) {
    throw new Error("No refresh token available — user must reconnect LinkedIn");
  }

  const refreshToken = decrypt(connection.refreshToken);

  const response = await fetch(`${LINKEDIN_AUTH_BASE}/accessToken`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: process.env.LINKEDIN_CLIENT_ID!,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`LinkedIn token refresh failed: ${error}`);
  }

  const tokens: LinkedInTokenResponse = await response.json();
  const now = new Date();

  // Persist updated tokens
  await db.socialConnection.update({
    where: { id: connection.id },
    data: {
      accessToken: encrypt(tokens.access_token),
      accessTokenExpiresAt: new Date(now.getTime() + tokens.expires_in * 1000),
      ...(tokens.refresh_token && {
        refreshToken: encrypt(tokens.refresh_token),
      }),
    },
  });

  return tokens.access_token;
}

// ─── Get valid access token (with auto-refresh) ───────────────────────────────

const TOKEN_EXPIRY_BUFFER = 5 * 60 * 1000; // 5 minutes

export async function getValidAccessToken(connection: SocialConnection): Promise<string> {
  const now = new Date();

  // Check if token is expired or about to expire
  const isExpired =
    !connection.accessTokenExpiresAt ||
    connection.accessTokenExpiresAt.getTime() - now.getTime() < TOKEN_EXPIRY_BUFFER;

  if (!isExpired) {
    return decrypt(connection.accessToken);
  }

  // Token expired — attempt refresh
  console.log(`[LinkedIn] Refreshing token for connection ${connection.id}`);
  return refreshAccessToken(connection);
}

// ─── Post publishing ─────────────────────────────────────────────────────────

interface PublishPostResult {
  linkedInPostId: string; // e.g. "urn:li:share:12345678"
}

export async function publishToLinkedIn(
  connection: SocialConnection,
  content: string
): Promise<PublishPostResult> {
  const accessToken = await getValidAccessToken(connection);
  const authorUrn = connection.platformUserId; // "urn:li:member:12345"

  // Build UGC Post payload (LinkedIn's recommended format)
  const payload = {
    author: authorUrn,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: {
          text: content,
        },
        shareMediaCategory: "NONE",
      },
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
    },
  };

  const response = await fetch(`${LINKEDIN_API_BASE}/ugcPosts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new LinkedInPublishError(
      `LinkedIn publish failed (${response.status}): ${errorBody}`,
      response.status
    );
  }

  // LinkedIn returns the post ID in the "id" field or "X-RestLi-Id" header
  const data = await response.json().catch(() => ({}));
  const postId =
    data.id ?? response.headers.get("X-RestLi-Id") ?? "unknown";

  return { linkedInPostId: postId };
}

// ─── Error types ──────────────────────────────────────────────────────────────

export class LinkedInPublishError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number
  ) {
    super(message);
    this.name = "LinkedInPublishError";
  }

  /** True if retrying might succeed (rate limit, server error) */
  get isRetryable(): boolean {
    return this.statusCode === 429 || this.statusCode >= 500;
  }
}
