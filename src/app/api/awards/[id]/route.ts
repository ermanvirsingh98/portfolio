import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, issuer, date, description, imageUrl, url, order } = body;

    const award = await prisma.award.update({
      where: { id: params.id },
      data: {
        title,
        issuer,
        date: new Date(date),
        description,
        imageUrl,
        url,
        order,
      },
    });

    return NextResponse.json(award);
  } catch (error) {
    console.error("Error updating award:", error);
    return NextResponse.json(
      { error: "Failed to update award" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.award.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting award:", error);
    return NextResponse.json(
      { error: "Failed to delete award" },
      { status: 500 }
    );
  }
}
