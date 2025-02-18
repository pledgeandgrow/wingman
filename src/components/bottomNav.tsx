'use client'

import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { HomeIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline"

const BottomNav = () => {
  const pathname = usePathname()

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 w-full bg-white shadow-md border-t flex justify-around py-3 md:hidden"
    )}>
      <Link href="/">
        <div className={cn(
          "flex flex-col items-center",
          pathname === "/" ? "text-black" : "text-gray-500 hover:text-black"
        )}>
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </div>
      </Link>

      <Link href="/search">
        <div className={cn(
          "flex flex-col items-center",
          pathname === "/search" ? "text-black" : "text-gray-500 hover:text-black"
        )}>
          <MagnifyingGlassIcon className="w-6 h-6" />
          <span className="text-xs">Search</span>
        </div>
      </Link>

      <Link href="/profile">
        <div className={cn(
          "flex flex-col items-center",
          pathname === "/profile" ? "text-black" : "text-gray-500 hover:text-black"
        )}>
          <UserIcon className="w-6 h-6" />
          <span className="text-xs">Sign in</span>
        </div>
      </Link>
    </nav>
  )
}

export default BottomNav
