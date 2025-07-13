import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single position
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; positionId: string }> }
) {
  try {
    const { id, positionId } = await params;
    const position = await prisma.experiencePosition.findUnique({
      where: { id: positionId },
    });

    if (!position) {
      return NextResponse.json(
        { error: "Position not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(position);
  } catch (error) {
    console.error("Error fetching position:", error);
    return NextResponse.json(
      { error: "Failed to fetch position" },
      { status: 500 }
    );
  }
}

// PUT update position
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; positionId: string }> }
) {
  try {
    const { id, positionId } = await params;
    const body = await request.json();
    const {
      title,
      startDate,
      endDate,
      isCurrent,
      description,
      year,
      employmentType,
      icon,
      skills,
      order,
    } = body;

    const position = await prisma.experiencePosition.update({
      where: { id: positionId },
      data: {
        title,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        isCurrent,
        description,
        year,
        employmentType,
        icon,
        skills,
        order,
      },
    });

    return NextResponse.json(position);
  } catch (error) {
    console.error("Error updating position:", error);
    return NextResponse.json(
      { error: "Failed to update position" },
      { status: 500 }
    );
  }
}

// DELETE position
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; positionId: string }> }
) {
  try {
    const { id, positionId } = await params;
    await prisma.experiencePosition.delete({
      where: { id: positionId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting position:", error);
    return NextResponse.json(
      { error: "Failed to delete position" },
      { status: 500 }
    );
  }
}
