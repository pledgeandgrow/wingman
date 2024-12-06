import React from 'react'
import Link from 'next/link'
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
      <div className="max-w-4xl mx-auto px-4 py-8">
  
       

        {/* Flight Cards */}
        <div className="w-full">
  <div className="grid gap-6 grid-cols-1 md:grid-cols-1">
    {[
      {
        from: "New York",
        fromAirport: "JFK Airport",
        to: "London",
        toAirport: "Heathrow Airport",
        departure: "09:00 AM",
        date: "23 May 2023",
        arrival: "03:00 PM",
        travelTime: "8 hours",
        user: { name: "John Doe", avatar: "/placeholder.svg" },
        baggage: "15 Kg",
      },
      {
        from: "Paris",
        fromAirport: "Charles de Gaulle",
        to: "Berlin",
        toAirport: "Berlin Airport",
        departure: "11:00 AM",
        date: "24 May 2023",
        arrival: "02:00 PM",
        travelTime: "3 hours",
        user: { name: "Jane Smith", avatar: "/placeholder.svg" },
        baggage: "20 Kg",
      },
      {
        from: "Tokyo",
        fromAirport: "Narita Airport",
        to: "Seoul",
        toAirport: "Incheon Airport",
        departure: "06:00 AM",
        date: "25 May 2023",
        arrival: "08:00 AM",
        travelTime: "2 hours",
        user: { name: "Akira Tanaka", avatar: "/placeholder.svg" },
        baggage: "10 Kg",
      },
      {
        from: "Sydney",
        fromAirport: "Sydney Airport",
        to: "Melbourne",
        toAirport: "Tullamarine Airport",
        departure: "12:00 PM",
        date: "26 May 2023",
        arrival: "01:30 PM",
        travelTime: "1.5 hours",
        user: { name: "Emily Davis", avatar: "/placeholder.svg" },
        baggage: "25 Kg",
      },
      {
        from: "Dubai",
        fromAirport: "Dubai Airport",
        to: "Mumbai",
        toAirport: "Chhatrapati Shivaji",
        departure: "08:00 AM",
        date: "27 May 2023",
        arrival: "12:00 PM",
        travelTime: "4 hours",
        user: { name: "Mohammed Ali", avatar: "/placeholder.svg" },
        baggage: "18 Kg",
      },
      {
        from: "Los Angeles",
        fromAirport: "LAX Airport",
        to: "San Francisco",
        toAirport: "SFO Airport",
        departure: "03:00 PM",
        date: "28 May 2023",
        arrival: "04:30 PM",
        travelTime: "1.5 hours",
        user: { name: "Chris Evans", avatar: "/placeholder.svg" },
        baggage: "12 Kg",
      },
      {
        from: "Chicago",
        fromAirport: "O'Hare Airport",
        to: "Dallas",
        toAirport: "DFW Airport",
        departure: "10:00 AM",
        date: "29 May 2023",
        arrival: "12:30 PM",
        travelTime: "2.5 hours",
        user: { name: "Anna Wilson", avatar: "/placeholder.svg" },
        baggage: "15 Kg",
      },
      {
        from: "Singapore",
        fromAirport: "Changi Airport",
        to: "Bangkok",
        toAirport: "Suvarnabhumi Airport",
        departure: "07:00 AM",
        date: "30 May 2023",
        arrival: "09:00 AM",
        travelTime: "2 hours",
        user: { name: "Nora Lim", avatar: "/placeholder.svg" },
        baggage: "10 Kg",
      },
      {
        from: "Madrid",
        fromAirport: "Barajas Airport",
        to: "Barcelona",
        toAirport: "El Prat Airport",
        departure: "05:00 PM",
        date: "31 May 2023",
        arrival: "06:30 PM",
        travelTime: "1.5 hours",
        user: { name: "Carlos Gomez", avatar: "/placeholder.svg" },
        baggage: "20 Kg",
      },
    ].map((card, index) => (
      <div key={index} className="bg-wing-blue rounded-xl">
        <div className="rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white">{card.from}</h2>
                <p className="text-sm text-gray-50">{card.fromAirport}</p>
              </div>
              <div className="flex-1 flex items-center justify-center mb-4">
                <div className="w-full h-px bg-blue-300 relative">
                  <Plane className="absolute size-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500" />
                </div>
              </div>
              <div className="flex-1 text-right">
                <h2 className="text-xl font-bold text-white">{card.to}</h2>
                <p className="text-sm text-gray-50">{card.toAirport}</p>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div>
                <p className="text-lg font-semibold text-white">{card.departure}</p>
                <p className="text-sm text-gray-50">{card.date}</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-50">Travel time</p>
                <div className="w-16 h-px bg-gray-300 my-2"></div>
                <p className="text-xs text-white">{card.travelTime}</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{card.arrival}</p>
                <p className="text-sm text-gray-50">{card.date}</p>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src={card.user.avatar} alt={card.user.name} />
                <AvatarFallback>{card.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-50">{card.user.name}</p>
              </div>
            </div>
            <Link href="/bookWingman"
              className={`${buttonVariants({
                variant: "outline",
              })} bg-white text-wing-blue font-bold`}
            >
              {card.baggage}
            </Link>
           
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


      </div>
    </div>
    
  )
}

export default page