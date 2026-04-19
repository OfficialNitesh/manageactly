// src/lib/db.ts
// Prisma Client singleton.
//
// In serverless (Vercel), each hot reload creates a new module instance.
// Without this pattern, you'd exhaust PostgreSQL's connection limit quickly.
// We attach the client to globalThis in development to survive hot reloads.

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

export default db;
