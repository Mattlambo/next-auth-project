import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

type FavoriteRequest = {
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
        { error: "You must be logged in to add favorites." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as FavoriteRequest;

    if (!body.tmdbId || !body.name) {
      return NextResponse.json(
        { error: "The show ID and name are required." },
        { status: 400 }
      );
    }

    const favorite = await prisma.favorite.upsert({
      where: {
        userId_tmdbId: {
          userId,
          tmdbId: body.tmdbId,
        },
      },
      update: {
        name: body.name,
        posterPath: body.posterPath ?? null,
        overview: body.overview ?? null,
        firstAirDate: body.firstAirDate ?? null,
        voteAverage: body.voteAverage ?? null,
      },
      create: {
        userId,
        tmdbId: body.tmdbId,
        name: body.name,
        posterPath: body.posterPath ?? null,
        overview: body.overview ?? null,
        firstAirDate: body.firstAirDate ?? null,
        voteAverage: body.voteAverage ?? null,
      },
    });

    return NextResponse.json({ favorite }, { status: 201 });
  } catch (error) {
    console.error("Failed to add favorite:", error);

    return NextResponse.json(
      { error: "Unable to add favorite." },
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
        { error: "You must be logged in to remove favorites." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as {
      tmdbId: number;
    };

    if (!body.tmdbId) {
      return NextResponse.json(
        { error: "The show ID is required." },
        { status: 400 }
      );
    }

    await prisma.favorite.deleteMany({
      where: {
        userId,
        tmdbId: body.tmdbId,
      },
    });

    return NextResponse.json({
      message: "Favorite removed.",
    });
  } catch (error) {
    console.error("Failed to remove favorite:", error);

    return NextResponse.json(
      { error: "Unable to remove favorite." },
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

    // Return all favorites for the Favorites page
    if (!tmdbIdParam) {
      const favorites = await prisma.favorite.findMany({
        where: {
          userId,
        },
      });

      return NextResponse.json(favorites);
    }

    // Check if a single show is favorited
    const tmdbId = Number(tmdbIdParam);

    if (Number.isNaN(tmdbId)) {
      return NextResponse.json(
        { error: "Invalid show ID." },
        { status: 400 }
      );
    }

    const favorite = await prisma.favorite.findUnique({
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

    return NextResponse.json({
      isFavorite: Boolean(favorite),
    });
  } catch (error) {
    console.error("Failed to load favorites:", error);

    return NextResponse.json(
      { error: "Unable to load favorites." },
      { status: 500 }
    );
  }
}