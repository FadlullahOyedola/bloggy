import { NextResponse } from "next/server";
import { db } from "../../db";

export async function GET() {
    try {
        const tickets = await db.supportTicket.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({ tickets });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 });
    }
}