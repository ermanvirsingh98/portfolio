import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single position
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; positionId: string } }
) {
  try {
    const position = await prisma.experiencePosition.findUnique({
      where: { id: params.positionId },
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
  { params }: { params: { id: string; positionId: string } }
) {
  try {
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
      where: { id: params.positionId },
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
  { params }: { params: { id: string; positionId: string } }
) {
  try {
    await prisma.experiencePosition.delete({
      where: { id: params.positionId },
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
