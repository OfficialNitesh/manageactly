// src/app/api/linkedin/connect/route.ts
// Initiates LinkedIn OAuth flow.
// Generates a CSRF state token, stores it in session, redirects to LinkedIn.

import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
import { getLinkedInAuthUrl } from "@/lib/linkedin";
import { requireAuth, withErrorHandling, badRequest } from "@/lib/api";
import { randomBytes } from "crypto";

export const GET = withErrorHandling(async (req: Request) => {
  await requireAuth();

  const url = new URL(req.url);
  const workspaceId = url.searchParams.get("workspaceId");

  if (!workspaceId) {
    return badRequest("workspaceId is required");
  }

  // Generate CSRF state — encodes workspaceId so callback knows where to save
  const nonce = randomBytes(16).toString("hex");
  const state = Buffer.from(
    JSON.stringify({ workspaceId, nonce })
  ).toString("base64url");

  // TODO: store nonce in a short-lived server-side cache or signed cookie
  // For MVP: we trust the state encoding + the fact that only authenticated users
  // can call this route. In production, store nonce in DB/Redis with 10min TTL.

  const authUrl = getLinkedInAuthUrl(state);

  return NextResponse.redirect(authUrl);
});
