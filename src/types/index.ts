// src/types/index.ts
// Shared TypeScript types across the application.

import type {
  User,
  Workspace,
  WorkspaceMember,
  Post,
  Subscription,
  SocialConnection,
  WorkspaceRole,
  PostStatus,
  PostPlatform,
  SubscriptionPlan,
  SubscriptionStatus,
} from "@prisma/client";

// Re-export Prisma enums for convenience
export type {
  WorkspaceRole,
  PostStatus,
  PostPlatform,
  SubscriptionPlan,
  SubscriptionStatus,
};

// ─── Workspace with common relations ─────────────────────────────────────────

export type WorkspaceWithSubscription = Workspace & {
  subscription: Subscription | null;
};

export type WorkspaceWithMembers = Workspace & {
  members: (WorkspaceMember & { user: Pick<User, "id" | "name" | "email" | "image"> })[];
};

export type WorkspaceWithConnections = Workspace & {
  socialConnections: SocialConnection[];
};

// ─── Post types ───────────────────────────────────────────────────────────────

export type PostSummary = Pick<
  Post,
  | "id"
  | "content"
  | "platform"
  | "status"
  | "scheduledAt"
  | "publishedAt"
  | "platformPostId"
  | "failureReason"
  | "aiGenerated"
  | "hashtags"
  | "createdAt"
  | "updatedAt"
>;

// ─── API response shapes ──────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface ApiErrorResponse {
  error: string;
}

// ─── AI generation ────────────────────────────────────────────────────────────

export interface GeneratePostRequest {
  workspaceId: string;
  platform: PostPlatform;
  prompt: string;
  tone: "professional" | "conversational" | "inspirational" | "educational";
  includeHashtags: boolean;
  postLength: "short" | "medium" | "long";
}

export interface GeneratePostResponse {
  content: string;
  platform: PostPlatform;
  creditsUsed: number;
  creditsLimit: number;
  model: string;
}

// ─── Session extension ────────────────────────────────────────────────────────

export interface AppSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  activeWorkspaceId?: string;
  activeWorkspaceRole?: WorkspaceRole;
}
