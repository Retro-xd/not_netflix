import { NextResponse } from "next/server";

const BASE_URL = "https://api.themoviedb.org/3";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch movies" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data.results);
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
