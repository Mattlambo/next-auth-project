export async function GET() {
  const response = await fetch(
    "https://api.themoviedb.org/3/trending/tv/day",
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    }
  );

  const data = await response.json();

  return Response.json(data);
}




