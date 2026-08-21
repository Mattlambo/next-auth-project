
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type WatchingRequest = {
  tmdbId: number;
  name: string;
  posterPath?: string | null;
  overview?: string | null;
  firstAirDate?: string | null;
  voteAverage?: number | null;
};


export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        { error: "You must be logged in to add to your watching list." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as WatchingRequest;

    if (
      !Number.isInteger(body.tmdbId) ||
      body.tmdbId <= 0 ||
      typeof body.name !== "string" ||
      !body.name.trim()
    ) {
      return NextResponse.json(
        { error: "A valid show ID and name are required." },
        { status: 400 }
      );
    }

    const watching = await prisma.watching.upsert({
      where: {
        userId_tmdbId: {
          userId,
          tmdbId: body.tmdbId,
        },
      },
      update: {
        name: body.name.trim(),
        posterPath: body.posterPath ?? null,
        overview: body.overview ?? null,
        firstAirDate: body.firstAirDate ?? null,
        voteAverage: body.voteAverage ?? null,
      },
      create: {
        userId,
        tmdbId: body.tmdbId,
        name: body.name.trim(),
        posterPath: body.posterPath ?? null,
        overview: body.overview ?? null,
        firstAirDate: body.firstAirDate ?? null,
        voteAverage: body.voteAverage ?? null,
      },
    });

    return NextResponse.json({ watching }, { status: 200 });
  } catch (error) {
    console.error("Failed to add to watching list:", error);

    return NextResponse.json(
      { error: "Unable to add show to watching list." },
      { status: 500 }
    );
  }
}


export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        { error: "You must be logged in to remove a show." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as {
      tmdbId: number;
    };

    if (
      !Number.isInteger(body.tmdbId) ||
      body.tmdbId <= 0
    ) {
      return NextResponse.json(
        { error: "A valid show ID is required." },
        { status: 400 }
      );
    }

    const result = await prisma.watching.deleteMany({
      where: {
        userId,
        tmdbId: body.tmdbId,
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { error: "Show was not found in your watching list." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Show removed from watching list." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to remove show from watching list:", error);

    return NextResponse.json(
      { error: "Unable to remove show from watching list." },
      { status: 500 }
    );
  }
}


export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const tmdbIdParam = searchParams.get("tmdbId");

    // Return all shows in the user's watching list
    if (!tmdbIdParam) {
      const watching = await prisma.watching.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json(watching, { status: 200 });
    }

    const tmdbId = Number(tmdbIdParam);

    if (
      !Number.isInteger(tmdbId) ||
      tmdbId <= 0
    ) {
      return NextResponse.json(
        { error: "Invalid show ID." },
        { status: 400 }
      );
    }

    const watching = await prisma.watching.findUnique({
      where: {
        userId_tmdbId: {
          userId,
          tmdbId,
        },
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json(
      {
        isWatching: Boolean(watching),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to load watching list:", error);

    return NextResponse.json(
      { error: "Unable to load watching list." },
      { status: 500 }
    );
  }
}