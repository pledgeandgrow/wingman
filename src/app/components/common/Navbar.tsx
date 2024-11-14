"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, Send, Plus, User, Earth, MenuIcon } from 'lucide-react'
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'
import supabase from '@/utils/supabase'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        setAuthenticated(false)
      } else {
        setAuthenticated(true)
      }
    };

    getSession();
  }, []);
  async function handleLogOut() {
    const { error } = await supabase.auth.signOut()
    router.push('/signIn')
    setAuthenticated(false)
    

    
  }

  return (
    <nav className="bg-white shadow py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
           <Link href={'/'}>
           <Image
              src="/assets/images/wing-logo.png" 
              alt="Logo"
              width={100}
              height={100} 
              className="rounded-full" 
            /></Link>
          </div>

          <div className="flex items-center justify-end flex-1">
            <div className="hidden sm:flex sm:space-x-8">
              <Link href="/send" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-md font-medium text-black hover:text-gray-500">
                <Send className="mr-2 h-4 w-4" />
                 Send item
              </Link>
              <Link href="/flights" className="mr-6 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-md font-medium text-black hover:text-gray-500">
                <Plus className="mr-2 h-4 w-4" />
                Post a Flight
              </Link>
              <Link href="/flights" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-md font-medium text-black hover:text-gray-500">
                New to wingman ?
              </Link>
              <Link href="/flights" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-md font-medium text-black hover:text-gray-500">
                <Earth className="mr-2 h-4 w-4" />
              </Link>
            </div>

            <div className="ml-6 hidden sm:flex items-center">
            <div  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-md font-medium text-black hover:text-gray-500">
              {authenticated ? <Button onClick={handleLogOut}  className={buttonVariants()} >Log Out</Button> : <Link href={'/signIn'} className={buttonVariants()} >Sign in</Link>}


               
            </div>
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full bg-white p-1 text-black hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 border-2 px-4 focus:ring-offset-2">
                    <MenuIcon/>
                    <span className="sr-only">Open user menu</span>
                    <User/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="block h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/send" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700">
              Send
            </Link>
            <Link href="/flights" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700">
              Flights
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
               <User/>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Link href="/profile" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                Profile
              </Link>
              <Link href="/settings" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                Settings
              </Link>
              <Link href="/signout" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                Sign out
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
