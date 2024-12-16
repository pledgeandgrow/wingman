import { Button, buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import Link from "next/link";

function page() {
  return (
      <div className='min-h-screen max-w-5xl mx-auto'>
		<main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Welcome Mehdi</h1>
          <Link className={buttonVariants()} href={'/registerItem'}>Register a package</Link>

        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold">My items</h2>
          
          <Tabs defaultValue="registered">
            <TabsList className="grid w-full grid-cols-4 max-w-[400px]">
              <TabsTrigger value="registered" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                registered
              </TabsTrigger>
              <TabsTrigger value="sent">
                Sent
              </TabsTrigger>
              <TabsTrigger value="to-be-sent">
                To be Sent
              </TabsTrigger>
              <TabsTrigger value="all">
                All
              </TabsTrigger>
            </TabsList>
          </Tabs>

          

          <Card className="p-4 max-w-[300px]">
            <div className="text-sm font-medium mb-4">ID 71xrh</div>
            <div className="flex gap-4 mb-4">
              <div className="h-12 w-12 bg-muted rounded flex items-center justify-center">
                👕
              </div>
              <div className="h-12 w-12 bg-muted rounded flex items-center justify-center">
                👔
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>L: 2 KG</div>
              <div>H: 80 CM</div>
              <div>W: 40 CM</div>
            </div>
          </Card>
        </div>
      </main>
	  </div>
	    )
}

export default page