import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const awards = await prisma.award.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(awards);
  } catch (error) {
    console.error("Error fetching awards:", error);
    return NextResponse.json(
      { error: "Failed to fetch awards" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, issuer, date, description, imageUrl, url } = body;

    const award = await prisma.award.create({
      data: {
        title,
        issuer,
        date: new Date(date),
        description,
        imageUrl,
        url,
      },
    });

    return NextResponse.json(award);
  } catch (error) {
    console.error("Error creating award:", error);
    return NextResponse.json(
      { error: "Failed to create award" },
      { status: 500 }
    );
  }
}
