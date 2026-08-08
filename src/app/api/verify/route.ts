import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Global Prisma client instance to prevent exceeding connection pool limits during hot-reloads
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
        return NextResponse.json(
            { error: "Missing verification parameters." },
            { status: 400 }
        );
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || user.verificationToken !== token) {
            return NextResponse.json(
                { error: "Invalid or expired verification token." },
                { status: 400 }
            );
        }

        // Update user: mark email verified and reset token
        await prisma.user.update({
            where: { email },
            data: {
                emailVerified: true,
                verificationToken: null,
            },
        });

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        // Redirect directly to onboarding page after successful verification
        return NextResponse.redirect(`${appUrl}/onboarding?verified=true`);
    } catch (err) {
        console.error("Verification Error:", err);
        return NextResponse.json(
            { error: "An error occurred during email verification." },
            { status: 500 }
        );
    }
}