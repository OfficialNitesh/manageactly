// src/app/api/auth/[...nextauth]/route.ts
// NextAuth v4 route handler for Next.js App Router.
// v4 exports a handler function, not { GET, POST }.
// We wrap it to work with App Router's expected export shape.

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
