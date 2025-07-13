import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      institution,
      degree,
      fieldOfStudy,
      location,
      startDate,
      endDate,
      description,
      logoUrl,
      order,
    } = body;

    const education = await prisma.education.update({
      where: { id },
      data: {
        institution,
        degree,
        fieldOfStudy,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        description,
        logoUrl,
        order,
      },
    });

    return NextResponse.json(education);
  } catch (error) {
    console.error("Error updating education:", error);
    return NextResponse.json(
      { error: "Failed to update education" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.education.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting education:", error);
    return NextResponse.json(
      { error: "Failed to delete education" },
      { status: 500 }
    );
  }
}
