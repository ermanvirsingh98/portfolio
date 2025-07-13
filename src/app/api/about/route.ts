import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const about = await prisma.about.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(about || {});
  } catch (error) {
    console.error("Error fetching about:", error);
    return NextResponse.json(
      { error: "Failed to fetch about data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, content, imageUrl } = body;

    // Delete existing about record if it exists
    await prisma.about.deleteMany();

    const about = await prisma.about.create({
      data: {
        title,
        description,
        content,
        imageUrl,
      },
    });

    return NextResponse.json(about);
  } catch (error) {
    console.error("Error creating about:", error);
    return NextResponse.json(
      { error: "Failed to create about data" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description, content, imageUrl } = body;

    const about = await prisma.about.update({
      where: { id },
      data: {
        title,
        description,
        content,
        imageUrl,
      },
    });

    return NextResponse.json(about);
  } catch (error) {
    console.error("Error updating about:", error);
    return NextResponse.json(
      { error: "Failed to update about data" },
      { status: 500 }
    );
  }
}
