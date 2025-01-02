'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
import Link from 'next/link'

function Hero() {
  return (
    <div
      style={{ background: "url(/assets/images/hero/hero.png)" }}
      className="relative h-[80vh] overflow-hidden py-24 lg:py-32 bg-cover bg-center"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl text-center mx-auto">
          <h1 className="scroll-m-20 md:text-6xl text-wing-blue dark:text-blue-300 text-4xl font-extrabold tracking-tight">
            It's more than <br /> just a trip
          </h1>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 mt-28 px-4 border-0 border-wing-orange sm:border-2 backdrop-blur-sm rounded-lg p-4 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-grow">
              <Select>
                <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Departure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="tokyo">Tokyo</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paris">Paris</SelectItem>
                  <SelectItem value="rome">Rome</SelectItem>
                  <SelectItem value="sydney">Sydney</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                placeholder="Date"
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <Select>
                <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Kilograms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 kg</SelectItem>
                  <SelectItem value="10">10 kg</SelectItem>
                  <SelectItem value="15">15 kg</SelectItem>
                  <SelectItem value="20">20 kg</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Link 
              href="/flights"  
              className={`${buttonVariants()} w-full lg:w-auto lg:px-8 lg:self-stretch bg-wing-blue hover:bg-wing-blue/90 dark:bg-blue-600 dark:hover:bg-blue-700 text-white`}
            >
              Search
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

