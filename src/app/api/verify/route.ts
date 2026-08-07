import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
        return NextResponse.json({ error: "Missing verification parameters." }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || user.verificationToken !== token) {
            return NextResponse.json({ error: "Invalid or expired verification token." }, { status: 400 });
        }

        await prisma.user.update({
            where: { email },
            data: {
                emailVerified: new Date(),
                verificationToken: null,
            },
        });

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        return NextResponse.redirect(`${appUrl}/login?verified=true`);
    } catch (err) {
        console.error("Verification Error:", err);
        return NextResponse.json({ error: "An error occurred during email verification." }, { status: 500 });
    }
}