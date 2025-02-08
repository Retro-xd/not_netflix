import React from 'react'
import SearchInput from './SearchInput'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/server'

const Navbar = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  const avatarUrl = data?.user?.user_metadata.picture || 'https://i.pravatar.cc/150'

  return (
    <nav className="flex items-center justify-between w-full gap-6 p-[36px]">
        <SearchInput />
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