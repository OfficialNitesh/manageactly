-- CreateEnum
CREATE TYPE "WorkspaceRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'SCHEDULED', 'PUBLISHING', 'PUBLISHED', 'FAILED');

-- CreateEnum
CREATE TYPE "PostPlatform" AS ENUM ('LINKEDIN');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'PAST_DUE', 'CANCELLED', 'TRIALING', 'INCOMPLETE');

-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('FREE', 'STARTER', 'PRO', 'ENTERPRISE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "emailVerified" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Workspace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkspaceMember" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "WorkspaceRole" NOT NULL DEFAULT 'MEMBER',
    "invitedByUserId" TEXT,
    "acceptedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkspaceMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialConnection" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "platform" "PostPlatform" NOT NULL,
    "platformUserId" TEXT NOT NULL,
    "platformUserName" TEXT,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scopes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialConnection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "platform" "PostPlatform" NOT NULL DEFAULT 'LINKEDIN',
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    "content" TEXT NOT NULL,
    "mediaUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "hashtags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "aiGenerated" BOOLEAN NOT NULL DEFAULT false,
    "aiPrompt" TEXT,
    "aiModel" TEXT,
    "scheduledAt" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    "platformPostId" TEXT,
    "failureReason" TEXT,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "lastRetriedAt" TIMESTAMP(3),
    "publishingLockAt" TIMESTAMP(3),
    "createdByUserId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'razorpay',
    "razorpaySubscriptionId" TEXT,
    "razorpayCustomerId" TEXT,
    "razorpayPlanId" TEXT,
    "plan" "SubscriptionPlan" NOT NULL DEFAULT 'FREE',
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'TRIALING',
    "currentPeriodStart" TIMESTAMP(3),
    "currentPeriodEnd" TIMESTAMP(3),
    "trialEndsAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "postsPerMonth" INTEGER NOT NULL DEFAULT 10,
    "aiCreditsPerMonth" INTEGER NOT NULL DEFAULT 20,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "actorId" TEXT,
    "actorEmail" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "metadata" JSONB DEFAULT '{}',
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_slug_key" ON "Workspace"("slug");

-- CreateIndex
CREATE INDEX "Workspace_ownerId_idx" ON "Workspace"("ownerId");

-- CreateIndex
CREATE INDEX "Workspace_slug_idx" ON "Workspace"("slug");

-- CreateIndex
CREATE INDEX "Workspace_deletedAt_idx" ON "Workspace"("deletedAt");

-- CreateIndex
CREATE INDEX "WorkspaceMember_workspaceId_idx" ON "WorkspaceMember"("workspaceId");

-- CreateIndex
CREATE INDEX "WorkspaceMember_userId_idx" ON "WorkspaceMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceMember_workspaceId_userId_key" ON "WorkspaceMember"("workspaceId", "userId");

-- CreateIndex
CREATE INDEX "SocialConnection_workspaceId_idx" ON "SocialConnection"("workspaceId");

-- CreateIndex
CREATE INDEX "SocialConnection_platform_idx" ON "SocialConnection"("platform");

-- CreateIndex
CREATE UNIQUE INDEX "SocialConnection_workspaceId_platform_key" ON "SocialConnection"("workspaceId", "platform");

-- CreateIndex
CREATE INDEX "Post_workspaceId_idx" ON "Post"("workspaceId");

-- CreateIndex
CREATE INDEX "Post_status_idx" ON "Post"("status");

-- CreateIndex
CREATE INDEX "Post_scheduledAt_idx" ON "Post"("scheduledAt");

-- CreateIndex
CREATE INDEX "Post_status_scheduledAt_idx" ON "Post"("status", "scheduledAt");

-- CreateIndex
CREATE INDEX "Post_deletedAt_idx" ON "Post"("deletedAt");

-- CreateIndex
CREATE INDEX "Post_createdByUserId_idx" ON "Post"("createdByUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_workspaceId_key" ON "Subscription"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_razorpaySubscriptionId_key" ON "Subscription"("razorpaySubscriptionId");

-- CreateIndex
CREATE INDEX "Subscription_workspaceId_idx" ON "Subscription"("workspaceId");

-- CreateIndex
CREATE INDEX "Subscription_status_idx" ON "Subscription"("status");

-- CreateIndex
CREATE INDEX "Subscription_razorpaySubscriptionId_idx" ON "Subscription"("razorpaySubscriptionId");

-- CreateIndex
CREATE INDEX "AuditLog_workspaceId_idx" ON "AuditLog"("workspaceId");

-- CreateIndex
CREATE INDEX "AuditLog_actorId_idx" ON "AuditLog"("actorId");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialConnection" ADD CONSTRAINT "SocialConnection_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
