import { searchMovies, type Movie } from "@/lib/movies"
import { Suspense } from "react"
import Image from "next/image"
import { Star } from "lucide-react"

interface SearchPageProps {
  searchParams: { q: string }
}

function MovieCard({ movie }: { movie: Movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/no-poster.png' // You'll need to add a fallback image

  return (
    <div className="bg-homeColorShade rounded-[60px] overflow-hidden hover:cursor-pointer hover:scale-105 transition-transform duration-300">
      <div className="relative h-[400px]">
        <Image
          src={imageUrl}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                    <Star color="yellow" fill="yellow" size={16} />
                    {movie.vote_average.toFixed(1)}
                </div>
            </div>
            
        </div>
        
        <p className="text-gray-300 text-sm line-clamp-3">{movie.overview}</p>
      </div>
    </div>
  )
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q ?? ''
  const movies = query ? await searchMovies(query) : []
  // Filter out movies with 0.0 rating
  const filteredMovies = movies.filter(movie => movie.vote_average > 0)

  return (
    <div className="container mx-auto py-8 px-4 bg-homeColor">
      {!query ? (
        <p className="text-white">Please enter a search term</p>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6 text-white">Search Results for: {query}</h1>
          <Suspense fallback={<div>Loading...</div>}>
            {filteredMovies.length === 0 ? (
              <p className="text-white">No movies found for "{query}"</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </Suspense>
        </>
      )}
    </div>
  )
}
