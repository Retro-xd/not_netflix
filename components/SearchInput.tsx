"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <button type="submit" className="flex items-center gap-2 border-[1px] rounded-[30px] p-1 outline-none w-full">
        <Search className="text-white ml-2" />
        <Input 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-white border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[#b8b6b9] placeholder:text-sm placeholder:font-light" 
          placeholder="Search everything"
        />
      </button>
    </form>
  )
}

export default SearchInput
