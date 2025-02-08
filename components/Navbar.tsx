import React from 'react'
import SearchInput from './SearchInput'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/server'

const Navbar = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  const avatarUrl = data?.user?.user_metadata.picture || 'https://i.pravatar.cc/150'
  const userName = data?.user?.user_metadata.name?.split(' ')[0] || data?.user?.user_metadata.email?.split('@')[0];

  return (
    <nav className="flex items-center w-full gap-6 p-[36px]">
        <SearchInput />
        <h2 className='flex text-xl font-semibold text-white flex-1 justify-end '>Hi, {userName}</h2>
        <div className="profileNav flex items-center gap-8">
            <Image 
                src={avatarUrl}
                width={50} 
                height={50} 
                alt="profile"
                className="rounded-full object-cover"
            />
        </div>
    </nav>
  )
}

export default Navbar