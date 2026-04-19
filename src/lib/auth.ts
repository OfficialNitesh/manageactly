// src/lib/auth.ts
// NextAuth v4 (stable) configuration.
// - Google OAuth only
// - No email provider, no nodemailer
// - Database sessions via Prisma adapter
// - Session enriched with userId + workspace context

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import db from "@/lib/db";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "select_account",
        },
      },
    }),
  ],

  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,   // 30 days
    updateAge: 24 * 60 * 60,     // refresh every 24h
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    /**
     * Enrich the session with userId and active workspace.
     * In v4 the `user` object is the DB user row (from adapter).
     */
    async session({ session, user }) {
      // Attach userId — not exposed by default in v4
      session.user.id = user.id;

      // Fetch first workspace membership for this user
      const membership = await db.workspaceMember.findFirst({
        where: { userId: user.id },
        orderBy: { createdAt: "asc" },
        select: { workspaceId: true, role: true },
      });

      if (membership) {
        session.activeWorkspaceId = membership.workspaceId;
        session.activeWorkspaceRole = membership.role;
      }

      return session;
    },
  },

  events: {
    /**
     * Auto-provision workspace when a new user signs up.
     */
    async createUser({ user }) {
      if (!user.id || !user.email) return;

      const baseName = user.name ?? user.email.split("@")[0];
      const slug =
        baseName
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "-")
          .replace(/-+/g, "-")
          .slice(0, 40) +
        "-" +
        user.id.slice(-6);

      try {
        const workspace = await db.workspace.create({
          data: {
            name: `${baseName}'s Workspace`,
            slug,
            ownerId: user.id,
            members: {
              create: {
                userId: user.id,
                role: "OWNER",
                acceptedAt: new Date(),
              },
            },
            subscription: {
              create: {
                plan: "FREE",
                status: "TRIALING",
                trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                postsPerMonth: 10,
                aiCreditsPerMonth: 20,
              },
            },
          },
        });

        await db.auditLog.create({
          data: {
            workspaceId: workspace.id,
            actorId: user.id,
            actorEmail: user.email,
            action: "workspace.created",
            entity: "Workspace",
            entityId: workspace.id,
            metadata: { plan: "FREE", source: "signup" },
          },
        });
      } catch (error) {
        console.error("[Auth] Failed to create workspace for new user:", error);
      }
    },
  },

  debug: process.env.NODE_ENV === "development",
};
