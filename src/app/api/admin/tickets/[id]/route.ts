import { NextResponse } from "next/server";
import { db } from "../../../../db";

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json();
        const updatedTicket = await db.supportTicket.update({
            where: { id: params.id },
            data: {
                adminResponse: body.adminResponse,
                status: body.status || "RESOLVED",
                respondedAt: new Date(),
            },
        });

        return NextResponse.json({ success: true, ticket: updatedTicket });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update ticket" }, { status: 500 });
    }
}
