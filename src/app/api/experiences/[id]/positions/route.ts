import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all positions for an experience
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const positions = await prisma.experiencePosition.findMany({
      where: { experienceId: params.id },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(positions);
  } catch (error) {
    console.error("Error fetching positions:", error);
    return NextResponse.json(
      { error: "Failed to fetch positions" },
      { status: 500 }
    );
  }
}

// POST new position
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
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

    const position = await prisma.experiencePosition.create({
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
        order: order || 0,
        experienceId: params.id,
      },
    });

    return NextResponse.json(position);
  } catch (error) {
    console.error("Error creating position:", error);
    return NextResponse.json(
      { error: "Failed to create position" },
      { status: 500 }
    );
  }
}
