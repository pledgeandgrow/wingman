import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import { Plane, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"




function page() {
  return (
    <div >
      <div className="bg-white/80 mt-28 px-4 border-0   border-wing-orange sm:border-2 backdrop-blur-sm rounded-lg p-4 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-grow">
          <Select >
            <SelectTrigger>
              <SelectValue placeholder="Departure" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new-york">New York</SelectItem>
              <SelectItem value="london">London</SelectItem>
              <SelectItem value="tokyo">Tokyo</SelectItem>
            </SelectContent>
          </Select>
          <Select >
            <SelectTrigger>
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
           
          />
          <Select >
            <SelectTrigger>
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
        <Button  className="w-full lg:w-auto lg:px-8 lg:self-stretch">
          Search
        </Button>
      </div>
      </div>
      <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Search Filters */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white/80 border-2 border-wing-orange backdrop-blur-sm rounded-lg p-6">
            <div className="grid gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Departure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="tokyo">Tokyo</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
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
              />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Kilograms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 kg</SelectItem>
                  <SelectItem value="10">10 kg</SelectItem>
                  <SelectItem value="15">15 kg</SelectItem>
                  <SelectItem value="20">20 kg</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full">
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Flight Cards */}
        <div className="w-full lg:w-2/3">
          <div className="grid gap-6">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-wing-blue rounded-xl p-6">
                <div className=" rounded-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white">New york</h2>
                        <p className="text-sm text-gray-50">JFK Airport</p>
                      </div>
                      <div className="flex-1 flex items-center justify-center mb-4">
                        <div className="w-full h-px bg-blue-300 relative">
                          <Plane className="absolute size-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500" />
                        </div>
                      </div>
                      <div className="flex-1 text-right">
                        <h2 className="text-2xl font-bold text-white">London</h2>
                        <p className="text-sm text-gray-50">Heathrow Airport</p>
                      </div>
                    </div>
                    <div className='flex justify-between mt-4'>
                      <div>
                        <p className="text-lg font-semibold text-white">09:00 AM</p>
                        <p className="text-sm text-gray-50">23 May 2023</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-50">Travel time</p>
                        <div className="w-16 h-px bg-gray-300 my-2"></div>
                        <p className="text-xs text-white">8 hours</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-white">03:00 PM</p>
                        <p className="text-sm text-gray-50">23 May 2023</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 flex items-center justify-between ">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-50">John Doe</p>
                      </div>
                    </div>
                    <Button className={`${buttonVariants({ variant: "outline" })} bg-white text-wing-blue font-bold`}>
                      15 Kg
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default page