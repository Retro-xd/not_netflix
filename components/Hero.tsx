"use client"
import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';

interface Movie {
    backdrop_path: string;
    title: string;
    vote_average: number;
    original_language: string;
    id: number;
    poster_path: string;
}

const Hero = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    
    useEffect(() => {
        const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2UxYWJhY2I4YTNiYzg1MjQyOWI1YjNhMWFmNmUxNCIsIm5iZiI6MTczMzY4MzIzOS4xNTgwMDAyLCJzdWIiOiI2NzU1ZTgyNzFlMTk0ZWQ2YmYzM2JkMGIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.CcEQBOu9KxBP83LX9mfiakAG6eGm_xytAoUykBQ83C4'
            }
        }

        fetch(url, options)
            .then(res => res.json())
            .then(data => setMovies(data.results))
            .catch(err => console.error(err));
    }, []);

    const handleThumbnailClick = (index: number) => {
        setCurrentMovieIndex(index);
    };

    const handleNextSet = () => {
        setStartIndex(prev => (prev + 4 >= movies.length) ? 0 : prev + 4);
    };

    const handlePrevSet = () => {
        setStartIndex(prev => (prev - 4 < 0) ? Math.max(movies.length - 4, 0) : prev - 4);
    };

    return (
        <div className="relative w-full h-[80%]">
            {movies.length > 0 && (
                <>
                    <div className="w-full h-full">
                        <img 
                            src={`${IMAGE_BASE_URL}${movies[currentMovieIndex].backdrop_path}`} 
                            alt={movies[currentMovieIndex].title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="flex items-center gap-4">
                            <div className='flex items-center gap-2 mb-10 glassmorphism h-[38px] w-[78px] justify-center rounded-[22px]'>
                                <Star color='yellow'  fill='yellow' size={20} />
                                <p className="text-white text-sm">{movies[currentMovieIndex].vote_average.toFixed(1)}</p>
                            </div>
                            <div className='flex items-center gap-2 mb-10 glassmorphism h-[38px] w-[78px] justify-center rounded-[22px]'>
                                {movies[currentMovieIndex].original_language === "en" 
                                    ? <img src="https://images.emojiterra.com/twitter/v14.0/256px/1f1fa-1f1f8.png" alt="flag" className='w-[18px] h-[18px]' />
                                    : movies[currentMovieIndex].original_language === "fr"
                                        ? <img src="https://images.emojiterra.com/twitter/v14.0/256px/1f1eb-1f1f7.png" alt="flag" className='w-[18px] h-[18px]' />
                                        : movies[currentMovieIndex].original_language === "es"
                                            ? <img src="https://images.emojiterra.com/twitter/v14.0/256px/1f1ea-1f1f8.png" alt="flag" className='w-[18px] h-[18px]' />
                                            : movies[currentMovieIndex].original_language === "de"
                                                ? <img src="https://images.emojiterra.com/twitter/v14.0/256px/1f1e9-1f1ea.png" alt="flag" className='w-[18px] h-[18px]' />
                                                : <img src="https://images.emojiterra.com/twitter/v14.0/256px/1f1f7-1f1fa.png" alt="flag" className='w-[18px] h-[18px]' />
                                }
                                <p className='text-white text-sm'>
                                    {movies[currentMovieIndex].original_language}
                                </p>
                            </div>
                        </div>
                        <h2 className="text-white text-2xl font-bold">{movies[currentMovieIndex].title}</h2>
                        
                        <div className="flex items-center gap-2 mt-4 w-full justify-between">
                            <Link target='_blank' href={`https://www.youtube.com/results?search_query=${movies[currentMovieIndex].title}`}>
                                <button className='bg-accentColor text-white p-2 rounded-[22px] w-[120px] h-[60px]'>Watch</button>
                            </Link>
                            
                            <div className='flex items-center gap-2'>
                                <button 
                                    onClick={handlePrevSet}
                                    className="bg-accentColor text-white p-2 rounded-full"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                
                                {movies.slice(startIndex, startIndex + 4).map((movie: any, index: number) => (
                                    <div 
                                        key={movie.id} 
                                        className="relative w-[100px] h-[80px] cursor-pointer hover:scale-105 transition-transform"
                                        onClick={() => handleThumbnailClick(startIndex + index)}
                                    >
                                        <div className="w-full h-full">
                                            <img 
                                                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                                                alt={movie.title}
                                                className={`w-full h-full object-cover rounded-md ${
                                                    startIndex + index === currentMovieIndex ? 'ring-2 ring-accentColor' : ''
                                                }`}
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-black/40 rounded-md opacity-0 hover:opacity-100 transition-opacity">
                                            <p className="text-white text-xs p-2">{movie.title}</p>
                                        </div>
                                    </div>
                                ))}

                                <button 
                                    onClick={handleNextSet}
                                    className="bg-accentColor text-white p-2 rounded-full"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Hero