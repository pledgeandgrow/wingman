'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, Send, Plus, User, Earth, MenuIcon, LogOut } from 'lucide-react'
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
import supabase from '@/utils/supabase'
import { useRouter } from 'next/navigation'
import { SignInPopup } from '../SignInPopUp'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        setAuthenticated(false)
        setUser(null)
      } else {
        setAuthenticated(true)
        setUser(data.session.user)
      }
    };

    getSession();
  }, []);

  async function handleLogOut() {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push('/')
      setAuthenticated(false)
      setUser(null)
    } else {
      console.error('Error signing out:', error.message)
    }
  }

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <User className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/myFlights">My Flights</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/myItems">My Items</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/myProfile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

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
            />
           </Link>
          </div>

          <div className="flex items-center justify-end flex-1">
            <div className="hidden sm:flex sm:space-x-8">
              <Link href="/registerItem" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-md font-medium text-black hover:text-gray-500">
                <Send className="mr-2 h-4 w-4" />
                 Register An Item
              </Link>
              <Link href="/postFlight" className="mr-6 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-md font-medium text-black hover:text-gray-500">
                <Plus className="mr-2 h-4 w-4" />
                Post a Flight
              </Link>
              <Link href="/bookWingman" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-md font-medium text-black hover:text-gray-500">
                New to wingman ?
              </Link>
              <Link href="/flights" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-md font-medium text-black hover:text-gray-500">
              Flights
                <Earth className="mr-2 ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="ml-6 hidden sm:flex items-center">
              <div className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-md font-medium text-black hover:text-gray-500">
                {authenticated ? (
                  <UserMenu />
                ) : (
                  <Button onClick={() => setIsSignInOpen(true)} className={buttonVariants()}>Sign in</Button>
                )}
              </div>
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
            <Link href="/registerItem" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700">
              Register An Item
            </Link>
            <Link href="/postFlight" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700">
              Post a Flight
            </Link>
            <Link href="/bookWingman" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700">
              New to wingman ?
            </Link>
            <Link href="/flights" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700">
              Flights
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {authenticated ? (
              <div className="space-y-1">
                <p className="block px-4 py-2 text-base font-medium text-gray-500">{user?.email}</p>
                <Link href="/myFlights" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                  My Flights
                </Link>
                <Link href="/myItems" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                  My Items
                </Link>
                <Link href="/myProfile" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                  Profile
                </Link>
                <div className=' w-full mx-auto flex justify-center'>
                  <Button onClick={handleLogOut} className="w-[80%] mx-auto  text-left px-4 py-2 text-base font-medium ">
                  Log out
                </Button>
                </div>
              </div>
            ) : (
              <Button onClick={() => setIsSignInOpen(true)} className="w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                Sign in
              </Button>
            )}
          </div>
        </div>
      )}

      <SignInPopup isOpen={isSignInOpen} onOpenChange={setIsSignInOpen} />
    </nav>
  )
}

