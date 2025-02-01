import Link from 'next/link'
import { ChartSpline, Clapperboard, Compass, Home, NotebookText, UserRound } from 'lucide-react'
import React from 'react'
import LogoutButton from '@/app/dashboard/LogoutButton'

const Sidebar = () => {
  return (
    <section className="sidebar bg-[#101012] h-screen">
        <div className="px-[12px] flex flex-col gap-6 h-screen justify-between">
            <div className="sidebar-heading flex items-center gap-2 ">
                <h1 className="sidebar-logo p-2 rounded-full bg-accentColor h-[50px] w-[50px] flex items-center justify-center">N²</h1>
                <p className="text-[24px] font-semibold"><span className='text-accentColor'>N</span>ot<span className='text-accentColor'>N</span>etflix</p>
            </div>

            <div className="flex flex-col">
                <h1 className="text-[14px] font-semibold text-gray-600 px-[12px] mb-2">News Feed</h1>
                <div className="flex flex-col gap-4">
                    <Link href="/" className="sidebar-link bg-accentColor rounded-full">
                        <Compass className="text-white" />
                        <p className="sidebar-label">Browse</p>
                    </Link>
                    <Link href="/" className="sidebar-link  rounded-full">
                        <ChartSpline className="text-white" />
                        <p className="sidebar-label">Trending</p>
                    </Link>
                    <Link href="/" className="sidebar-link  rounded-full">
                        <UserRound className="text-white" />
                        <p className="sidebar-label">Following</p>
                    </Link>
                    <Link href="/" className="sidebar-link  rounded-full">
                        <Clapperboard className="text-white" />
                        <p className="sidebar-label">Your Videos</p>
                    </Link>
                    <Link href="/" className="sidebar-link  rounded-full">
                        <NotebookText className="text-white" />
                        <p className="sidebar-label">Playlist</p>
                    </Link>
                </div>
            </div>

            <div className="flex">
                <LogoutButton/>
            </div>
        </div>
    </section>
  )
}

export default Sidebar