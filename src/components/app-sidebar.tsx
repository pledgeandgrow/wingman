"use client"

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  DollarSignIcon,
  Frame,
  GalleryVerticalEnd,
  Map,
  MoreHorizontal,
  PieChart,
  Plane,
  Settings2,
  SquareTerminal,
  User2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import supabase from "@/utils/supabase"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'


// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Flights",
      url: "#",
      icon: Plane,
      isActive: true,
      items: [
        {
          title: "My flights",
          url: "/userDashboardGroup/myFlights",
        },
        
      ],
    },
    {
      title: "Items",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "My items",
          url: "/userDashboardGroup/myItems",
        },
        
      ],
    },
    {
      title: "more",
      url: "#",
      icon: MoreHorizontal,
      items: [
        {
          title: "Top wignmans",
          url: "#",
        },
        
      ],
    },
   
  ],
  projects: [
    {
      name: "my Transactions",
      url: "#",
      icon: DollarSignIcon,
    },
   
    
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div key='nav-user'>
        <NavUser   />


        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
     
      <SidebarRail />
    </Sidebar>
  )
}
