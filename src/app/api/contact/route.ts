import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, category, subject, message, attachment, ticketId } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "Missing required fields: name, email, subject, or message." },
                { status: 400 }
            );
        }

        // Generate a unique ticket reference if not provided by client
        const refId = ticketId || `BG-${Math.floor(10000 + Math.random() * 90000)}`;

        // Save ticket directly to Neon database
        const newTicket = await prisma.supportTicket.create({
            data: {
                ticketId: refId,
                name,
                email,
                category: category || "General Support",
                subject,
                message,
                attachment: attachment || null,
                status: "OPEN",
            },
        });

        return NextResponse.json(
            { success: true, ticket: newTicket },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Support Ticket Database Error:", error);
        return NextResponse.json(
            { error: "Failed to process support submission." },
            { status: 500 }
        );
    }
}