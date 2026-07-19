import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const token = process.env.TMDB_ACCESS_TOKEN;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Show id is required" },
      { status: 400 }
    );
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}