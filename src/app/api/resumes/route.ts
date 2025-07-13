import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resumes = await prisma.resume.findMany({
      include: {
        sections: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(resumes);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return NextResponse.json(
      { error: "Failed to fetch resumes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, template, theme, fontFamily, fontSize, spacing, sections } =
      body;

    console.log("API received resume data:", {
      title,
      template,
      theme,
      sections,
    });

    if (!title) {
      return NextResponse.json(
        { error: "Resume title is required" },
        { status: 400 }
      );
    }

    const sectionsToCreate =
      sections?.map((section: any, index: number) => {
        const sectionData = {
          type: section.type,
          title: section.title,
          content: JSON.stringify(section.content),
          order: index,
          isVisible: section.isVisible !== false,
        };
        console.log(`Creating section ${section.type}:`, sectionData);
        return sectionData;
      }) || [];

    const resume = await prisma.resume.create({
      data: {
        title,
        template: template || "modern",
        theme: theme || "light",
        fontFamily: fontFamily || "inter",
        fontSize: fontSize || "medium",
        spacing: spacing || "normal",
        sections: {
          create: sectionsToCreate,
        },
      },
      include: {
        sections: {
          orderBy: { order: "asc" },
        },
      },
    });

    console.log("Created resume in database:", resume);
    return NextResponse.json(resume, { status: 201 });
  } catch (error) {
    console.error("Error creating resume:", error);
    return NextResponse.json(
      { error: "Failed to create resume" },
      { status: 500 }
    );
  }
}
