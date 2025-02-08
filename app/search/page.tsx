"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
  vote_average: number;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounced search effect
  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/search?query=${query}`);
        if (!res.ok) throw new Error("Failed to fetch movies");

        const data = await res.json();
        setMovies(data.filter((movie: Movie) => movie.vote_average > 0));
      } catch (err) {
        setError("Error fetching movies. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchMovies, 500);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="container mx-auto py-8 px-4 bg-homeColor">
      {!query ? (
        <p className="text-white text-center">Please enter a search term</p>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6 text-white">
            Search Results for: {query}
          </h1>

          {loading && <p className="text-white">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {movies.length === 0 && !loading ? (
            <p className="text-white">No movies found for &quot;{query}&quot;</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function MovieCard({ movie, index }: { movie: Movie; index: number }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-poster.png";

  return (
    <div className="bg-homeColorShade rounded-[60px] overflow-hidden hover:cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-lg">
      <div className="relative h-[400px]">
        <Image
          src={imageUrl}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 3}
        />
      </div>
      <div className="p-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-white">{movie.title}</h2>
          <div className="flex items-center gap-6">
            <p className="text-gray-400 text-sm">
              {new Date(movie.release_date).getFullYear()}
            </p>
            <div className="flex items-center text-white gap-1">
              <Star color="yellow" fill="yellow" size={16} aria-label="Rating" />
              {movie.vote_average.toFixed(1)}
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm line-clamp-3">{movie.overview}</p>
      </div>
    </div>
  );
}
