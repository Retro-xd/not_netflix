// pages/api/search.ts
import { NextApiRequest, NextApiResponse } from "next";

const BASE_URL = "https://api.themoviedb.org/3";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { query } = req.query;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Query parameter is required" });
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
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();
    return res.status(200).json(data.results);
  } catch (error) {
    console.error("Error fetching movies:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
