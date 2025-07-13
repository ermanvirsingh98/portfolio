import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { platform, url, iconUrl, isActive, order } = body;

    const socialLink = await prisma.socialLink.update({
      where: { id: params.id },
      data: {
        platform,
        url,
        iconUrl,
        isActive,
        order,
      },
    });

    return NextResponse.json(socialLink);
  } catch (error) {
    console.error("Error updating social link:", error);
    return NextResponse.json(
      { error: "Failed to update social link" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.socialLink.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting social link:", error);
    return NextResponse.json(
      { error: "Failed to delete social link" },
      { status: 500 }
    );
  }
}
