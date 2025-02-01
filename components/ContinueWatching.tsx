"use client"
import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react';


interface Movie {
  backdrop_path: string;
  title: string;
  vote_average: number;
  original_language: string;
  id: number;
  poster_path: string;
}

const ContinueWatching = () => {

  const [movies, setMovies] = useState<Movie[]>([]);

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  const [urlLink, setUrlLink] = useState("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2024&sort_by=revenue.desc")

  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const [selectedOption, setSelectedOption] = useState("Popular");

  useEffect(() => {
    const url = urlLink;
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
}, [urlLink]);

  
  return (
    <section className='container'>
      <div className='flex items-center justify-between'>
        <h1 className='text-white text-2xl font-bold my-8 mx-4'>Continue Watching</h1>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className='border-gray-500 border-[1px] font-semibold text-white p-6 rounded-[22px] w-[150px] h-[50px] flex items-center justify-between gap-2'>
              {selectedOption}
              <ChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-homeColor border-none'>
            <DropdownMenuItem 
              onClick={() => {
                setUrlLink('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1');
                setSelectedOption('New');
              }} 
              className='text-white font-semibold'
            >
              New
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => {
                setUrlLink('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2024&sort_by=revenue.desc');
                setSelectedOption('Popular');
              }} 
              className='text-white font-semibold'
            >
              Popular
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
      <div className="grid grid-cols-4 gap-4">
        {movies.map((movie, index) => (
          <div key={index} className="flex justify-center items-center">
            <MovieCard 
              key={movie.id}
              image={IMAGE_BASE_URL + movie.poster_path} 
              title={movie.title} 
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default ContinueWatching