import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const overview = await prisma.overview.findFirst();

    return NextResponse.json(overview);
  } catch (error) {
    console.error("Error fetching overview:", error);
    return NextResponse.json(
      { error: "Failed to fetch overview" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      displayName,
      username,
      gender,
      bio,
      flipSentences,
      address,
      phoneNumber,
      email,
      website,
      otherWebsites,
      dateOfBirth,
      jobTitle,
      avatar,
      ogImage,
      keywords,
      dateCreated,
    } = body;

    // Check if overview already exists
    const existingOverview = await prisma.overview.findFirst();

    if (existingOverview) {
      // Update existing overview
      const updatedOverview = await prisma.overview.update({
        where: { id: existingOverview.id },
        data: {
          firstName,
          lastName,
          displayName,
          username,
          gender,
          bio,
          flipSentences,
          address,
          phoneNumber,
          email,
          website,
          otherWebsites,
          dateOfBirth,
          jobTitle,
          avatar,
          ogImage,
          keywords,
          dateCreated,
        },
      });

      return NextResponse.json(updatedOverview);
    } else {
      // Create new overview
      const newOverview = await prisma.overview.create({
        data: {
          firstName,
          lastName,
          displayName,
          username,
          gender,
          bio,
          flipSentences,
          address,
          phoneNumber,
          email,
          website,
          otherWebsites,
          dateOfBirth,
          jobTitle,
          avatar,
          ogImage,
          keywords,
          dateCreated,
        },
      });

      return NextResponse.json(newOverview);
    }
  } catch (error) {
    console.error("Error creating/updating overview:", error);
    return NextResponse.json(
      { error: "Failed to create/update overview" },
      { status: 500 }
    );
  }
}
