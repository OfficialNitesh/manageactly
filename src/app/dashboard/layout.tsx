// src/app/dashboard/layout.tsx
// Dashboard shell. Auth enforced by middleware.
// Uses NextAuth v4 getServerSession.

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const membership = await db.workspaceMember.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
    include: {
      workspace: {
        include: {
          subscription: {
            select: { plan: true, status: true },
          },
        },
      },
    },
  });

  const workspace = membership?.workspace;

  const navItems = [
    { label: "Overview", href: "/dashboard" },
    { label: "Posts", href: "/dashboard/posts" },
    { label: "Create", href: "/dashboard/posts/new" },
    { label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-mist flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-navy-950 border-r border-navy-800 shrink-0">
        <div className="px-6 py-5 border-b border-navy-800">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-teal-accent rounded-md flex items-center justify-center">
              <span className="text-paper text-xs font-display font-bold">M</span>
            </div>
            <span className="font-display font-semibold text-paper text-base tracking-tight">
              Manage Actly
            </span>
          </Link>
        </div>

        {workspace && (
          <div className="px-6 py-4 border-b border-navy-800">
            <p className="text-xs font-mono text-navy-500 uppercase tracking-widest mb-1">Workspace</p>
            <p className="text-sm text-navy-200 font-medium truncate">{workspace.name}</p>
            <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-teal-accent/10 text-teal-accent">
              {workspace.subscription?.plan ?? "FREE"}
            </span>
          </div>
        )}

        <nav className="flex-1 px-4 py-6 space-y-1" aria-label="Dashboard navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-navy-300 hover:text-paper hover:bg-navy-800 transition-all duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-navy-800">
          <div className="flex items-center gap-3 px-3 py-2">
            {session.user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={session.user.image} alt="" className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center">
                <span className="text-xs text-navy-300 font-semibold">
                  {session.user.name?.[0] ?? session.user.email?.[0] ?? "U"}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-navy-200 font-medium truncate">{session.user.name}</p>
              <p className="text-xs text-navy-500 truncate">{session.user.email}</p>
            </div>
          </div>
          <Link
            href="/api/auth/signout"
            className="mt-2 block w-full text-center text-xs text-navy-500 hover:text-navy-300 transition-colors py-1"
          >
            Sign out
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
