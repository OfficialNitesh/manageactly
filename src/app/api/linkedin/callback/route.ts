// src/app/api/linkedin/callback/route.ts
// OAuth callback — LinkedIn redirects here after user grants permission.
// Exchanges authorization code for tokens, fetches profile, stores connection.

import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
import {
  exchangeLinkedInCode,
  getLinkedInProfile,
  storeLinkedInConnection,
} from "@/lib/linkedin";
import { requireAuth, withErrorHandling } from "@/lib/api";
import db from "@/lib/db";

export const GET = withErrorHandling(async (req: Request) => {
  const { session } = await requireAuth();
  const url = new URL(req.url);

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  // User denied LinkedIn permission
  if (error) {
    console.warn("[LinkedIn Callback] User denied OAuth:", error);
    return NextResponse.redirect(
      new URL("/dashboard/settings?error=linkedin_denied", req.url)
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      new URL("/dashboard/settings?error=linkedin_invalid", req.url)
    );
  }

  // Decode state to get workspaceId
  let workspaceId: string;
  try {
    const decoded = JSON.parse(Buffer.from(state, "base64url").toString());
    workspaceId = decoded.workspaceId;
    if (!workspaceId) throw new Error("No workspaceId in state");
  } catch {
    return NextResponse.redirect(
      new URL("/dashboard/settings?error=linkedin_state_invalid", req.url)
    );
  }

  // Verify user belongs to this workspace
  const membership = await db.workspaceMember.findUnique({
    where: {
      workspaceId_userId: {
        workspaceId,
        userId: session.user.id,
      },
    },
  });

  if (!membership || membership.role === "MEMBER") {
    return NextResponse.redirect(
      new URL("/dashboard/settings?error=unauthorized", req.url)
    );
  }

  // Exchange code for tokens
  const tokens = await exchangeLinkedInCode(code);

  // Fetch LinkedIn profile
  const profile = await getLinkedInProfile(tokens.access_token);

  // Store connection (encrypted)
  await storeLinkedInConnection(workspaceId, tokens, profile);

  // Audit log
  await db.auditLog.create({
    data: {
      workspaceId,
      actorId: session.user.id,
      actorEmail: session.user.email ?? undefined,
      action: "social.connected",
      entity: "SocialConnection",
      metadata: { platform: "LINKEDIN", profileName: profile.name },
    },
  });

  return NextResponse.redirect(
    new URL("/dashboard/settings?success=linkedin_connected", req.url)
  );
});
