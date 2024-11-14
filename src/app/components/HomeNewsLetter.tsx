import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

function HomeNewsLetter() {
  return (
<div className="w-full bg-[#F5F5F5]  max-w-6xl mx-auto p-4">
      <div className="bg-[#002366] py-8 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-lg text-white mb-2 md:mb-0 md:mr-4">
            Subscribe to our newsletter for the latest updates:
          </p>
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-md bg-white border-white focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-900 placeholder-gray-500"
            />
            <Button 
              type="submit" 
              className="rounded-md bg-[#D4AC2C] text-white hover:bg-[#C09B1D] transition-colors"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      </div>  )
}

export default HomeNewsLetter