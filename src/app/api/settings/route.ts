import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(settings || {});
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { siteTitle, siteDescription, theme } = body;

    // Delete existing settings if they exist
    await prisma.settings.deleteMany();

    const settings = await prisma.settings.create({
      data: {
        siteTitle,
        siteDescription,
        theme,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error creating settings:", error);
    return NextResponse.json(
      { error: "Failed to create settings" },
      { status: 500 }
    );
  }
}
