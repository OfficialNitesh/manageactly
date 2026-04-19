// src/types/next-auth.d.ts
// Extends NextAuth v4 session and JWT types.
// This file must be named next-auth.d.ts for TypeScript to pick it up.

import type { WorkspaceRole } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    activeWorkspaceId?: string;
    activeWorkspaceRole?: WorkspaceRole;
  }

  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    activeWorkspaceId?: string;
    activeWorkspaceRole?: WorkspaceRole;
  }
}
