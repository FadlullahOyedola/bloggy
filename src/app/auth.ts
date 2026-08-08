import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
// Try to require the Prisma client from common possible locations.
// Some setups use absolute imports ("@/lib/db") while others use relative ("../lib/db").
// Use require with a fallback to avoid TS/ES module resolution errors at build-time.
let db: any;
try {
    // prefer relative import from src/app -> src/lib/db
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    db = require("../lib/db").db;
} catch (e1) {
    try {
        // try absolute alias
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        db = require("@/lib/db").db;
    } catch (e2) {
        // rethrow original error for clearer diagnostics
        throw e1;
    }
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await db.user.findUnique({
                    where: { email: credentials.email as string },
                });

                if (!user || !user.passwordHash) return null;

                const isValid = await bcrypt.compare(
                    credentials.password as string,
                    user.passwordHash
                );

                if (!isValid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // AdapterUser type may not include custom fields like `role`, so cast to any
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
                (session.user as any).role = token.role as "USER" | "AUTHOR" | "ADMIN";
            }
            return session;
        },
    },
});