// src/app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard | Manage Actly" };

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const membership = await db.workspaceMember.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
    include: {
      workspace: {
        include: {
          subscription: true,
          socialConnections: {
            where: { revokedAt: null },
            select: { platform: true, platformUserName: true },
          },
        },
      },
    },
  });

  if (!membership) redirect("/login");

  const workspace = membership.workspace;

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [totalPosts, publishedThisMonth, scheduledPosts, failedPosts] =
    await Promise.all([
      db.post.count({ where: { workspaceId: workspace.id, deletedAt: null } }),
      db.post.count({
        where: { workspaceId: workspace.id, status: "PUBLISHED", publishedAt: { gte: startOfMonth } },
      }),
      db.post.count({ where: { workspaceId: workspace.id, status: "SCHEDULED" } }),
      db.post.count({ where: { workspaceId: workspace.id, status: "FAILED" } }),
    ]);

  const linkedInConnected = workspace.socialConnections.some((c) => c.platform === "LINKEDIN");

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl text-ink mb-1">
          Welcome back{session.user.name ? `, ${session.user.name.split(" ")[0]}` : ""}.
        </h1>
        <p className="text-charcoal-500 text-sm">Here&apos;s what&apos;s happening in {workspace.name}.</p>
      </div>

      {!linkedInConnected && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
          <p className="text-sm text-amber-800">LinkedIn not connected. Connect your account to start publishing.</p>
          <Link href="/dashboard/settings" className="text-sm font-semibold text-amber-900 hover:underline">
            Connect →
          </Link>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Posts", value: totalPosts },
          { label: "Published This Month", value: publishedThisMonth, sub: `of ${workspace.subscription?.postsPerMonth ?? 10}` },
          { label: "Scheduled", value: scheduledPosts },
          { label: "Failed", value: failedPosts, alert: failedPosts > 0 },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`bg-paper rounded-2xl border p-6 ${stat.alert ? "border-red-200 bg-red-50" : "border-charcoal-100"}`}
          >
            <p className="text-2xl font-display font-bold text-ink">{stat.value}</p>
            <p className="text-sm text-charcoal-600 mt-1">{stat.label}</p>
            {stat.sub && <p className="text-xs text-charcoal-400 mt-0.5">{stat.sub}</p>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/dashboard/posts/new" className="bg-ink text-paper rounded-2xl p-8 flex flex-col justify-between hover:bg-navy-800 transition-colors duration-200">
          <div className="w-10 h-10 rounded-xl bg-teal-accent/20 flex items-center justify-center mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          </div>
          <div>
            <h3 className="font-display text-xl text-paper mb-1">Create Post</h3>
            <p className="text-navy-300 text-sm">AI-assisted LinkedIn content generation and scheduling.</p>
          </div>
        </Link>

        <Link href="/dashboard/posts" className="bg-paper border border-charcoal-100 rounded-2xl p-8 flex flex-col justify-between hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
          <div className="w-10 h-10 rounded-xl bg-mist flex items-center justify-center mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
          </div>
          <div>
            <h3 className="font-display text-xl text-ink mb-1">View All Posts</h3>
            <p className="text-charcoal-500 text-sm">Manage drafts, scheduled, and published content.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
