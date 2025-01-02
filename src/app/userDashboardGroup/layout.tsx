'use client'

import { AppSidebar } from "@/components/app-sidebar"
import { FullScreenLoader } from "@/components/full-screen-loader"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/theme-switcher"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { ReactNode, useEffect, useState } from "react"
import { NotificationDropdown } from "./components/notification-dropdown"

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <section lang="en" >
      <div>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 px-4 justify-between shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center justify-between gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  
                </div>
                <div className="flex items-center gap-2">
                  <NotificationDropdown />
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </div>
    </section>
  )
}

