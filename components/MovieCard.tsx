import React from 'react'

interface MovieCardProps {
  image: string;
  title: string;
}

const MovieCard = ({ image, title }: MovieCardProps) => {
  return (
    <section className='flex flex-col items-center justify-center'>
        <img src={image} alt={title} height={200} width={200} className='rounded-[40px] object-cover cursor-pointer hover:scale-105 transition-all duration-300'/>
        <h2 className='text-white text-sm font-semibold text-center mt-2'>{title}</h2>
    </section>
  )
}

export default MovieCard