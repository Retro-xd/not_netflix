import ContinueWatching from '@/components/ContinueWatching'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import React from 'react'

const Home = () => {
  return (
    <section className="home bg-homeColor flex flex-col">
      <div className="home-content">
            <Navbar />
            <Hero />
            <ContinueWatching />
      </div>
            

    </section>
  )
}

export default Home