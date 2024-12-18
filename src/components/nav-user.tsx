"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles, User, User2 } from 'lucide-react'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import supabase from "@/utils/supabase"
import { Button } from "./ui/button"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

export function NavUser() {
  const { isMobile } = useSidebar()
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error || !data.session) {
          setAuthenticated(false)
          setUser(null)
          router.push('/')
        } else {
          setAuthenticated(true)
          setUser(data.session.user)
         
        }
      } catch (error) {
        console.error('Error getting session:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getSession()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          setAuthenticated(false)
          setUser(null)
          router.push('/')
          toast({
            title: "You've logged out",
            description: "You've successfully logged out",
            variant: "default"
          })
        } else if (event === "SIGNED_IN" && session) {
          setAuthenticated(true)
          setUser(session.user)
          
        }
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router])

  const handleLogOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Error signing out:', error)
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      })
    }
  }

  if (isLoading) {
    return <div className="p-2">Loading...</div>
  }

  if (!authenticated || !user) {
    return (
      <div className="p-2">
        <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/login')}>
          <User className="mr-2 h-4 w-4" />
          Sign In
        </Button>
      </div>
    )
  }

  return (
   <div key='uniqueOne'>
     <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name} />
                <AvatarFallback className="rounded-lg">
                  {user.user_metadata?.full_name?.[0] || user.email?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.user_metadata?.full_name || 'User'}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name} />
                  <AvatarFallback className="rounded-lg">
                    {user.user_metadata?.full_name?.[0] || user.email?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.user_metadata?.full_name || 'User'}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles className="mr-2 h-4 w-4" />
                <span>Upgrade to Pro</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User2 className="mr-2 h-4 w-4" />
                <Link href={'/userDashboardGroup/myProfile'}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuItem onSelect={handleLogOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
   </div>
  )
}

