import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const socialLinks = await prisma.socialLink.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(socialLinks);
  } catch (error) {
    console.error("Error fetching social links:", error);
    return NextResponse.json(
      { error: "Failed to fetch social links" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { platform, url, iconUrl, isActive } = body;

    const socialLink = await prisma.socialLink.create({
      data: {
        platform,
        url,
        iconUrl,
        isActive,
      },
    });

    return NextResponse.json(socialLink);
  } catch (error) {
    console.error("Error creating social link:", error);
    return NextResponse.json(
      { error: "Failed to create social link" },
      { status: 500 }
    );
  }
}
