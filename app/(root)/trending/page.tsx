"use client"
import { Star } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'
import { useEffect } from 'react';

interface Movie {
    backdrop_path: string;
    title: string;
    vote_average: number;
    original_language: string;
    id: number;
    poster_path: string;
    release_date: string;
    overview: string;
  }

  function MovieCard({ movie, index }: { movie: Movie; index: number }) {
    const imageUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '/no-poster.png';
  
    return (
      <div className="flex bg-homeColorShade rounded-[40px] overflow-hidden hover:cursor-pointer  hover:shadow-lg w-[100%]">
        <div className="p-2 w-[250px]">
          <div className="">
          <img src={imageUrl} alt={movie.title} height={240} width={240} className='rounded-[40px] object-cover cursor-pointer'/>
          </div>
        </div>
        <div className="p-8 flex flex-col flex-1 justify-between">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white text-[38px]">{movie.title}</h2>
            <div className="flex items-center gap-6">
              <p className="text-gray-400 text-base">
                {new Date(movie.release_date).getFullYear()}
              </p>
              
            </div>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-gray-300 text-base w-[300px] line-clamp-4">{movie.overview}</p>
            <div className="flex items-center text-white gap-1">
                    <Star color="yellow" fill="yellow" size={16} aria-label="Rating" />
                    {movie.vote_average.toFixed(1)}
                </div>
            </div>
          </div>
          
      </div>
    );
  }

const page = () => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2UxYWJhY2I4YTNiYzg1MjQyOWI1YjNhMWFmNmUxNCIsIm5iZiI6MTczMzY4MzIzOS4xNTgwMDAyLCJzdWIiOiI2NzU1ZTgyNzFlMTk0ZWQ2YmYzM2JkMGIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.CcEQBOu9KxBP83LX9mfiakAG6eGm_xytAoUykBQ83C4'
          }
        };
        
        fetch(url, options)
          .then(res => res.json())
          .then(data => setMovies(data.results))
          .catch(err => console.error(err));
    
    }, [])

  return (

    <section className="home bg-homeColor flex flex-col">
        <div className="home-content container">
            <div className="flex flex-col gap-4">
            {movies.map((movie, index) => (
            <div key={index} className="flex justify-center items-center">
                <MovieCard key={movie.id} movie={movie} index={index} />
            </div>
            ))}
        </div>
        </div>
    </section>
  )
}

export default page