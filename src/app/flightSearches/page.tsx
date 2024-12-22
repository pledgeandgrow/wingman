import React from 'react';
import Link from 'next/link';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Plane } from 'lucide-react';
import plane from "../assets/plane.png";
import line from "../assets/line.png";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Home() {
  const cards = [
    {
      from: 'New York',
      fromAirport: 'JFK Airport',
      to: 'London',
      toAirport: 'Heathrow Airport',
      departure: '09:00 AM',
      date: '23 May 2023',
      arrival: '03:00 PM',
      travelTime: '8 hours',
      user: { name: 'John Doe', avatar: '/placeholder.svg' },
      baggage: '15 Kg',
    },
    {
      from: 'Paris',
      fromAirport: 'Charles de Gaulle',
      to: 'Berlin',
      toAirport: 'Berlin Airport',
      departure: '11:00 AM',
      date: '24 May 2023',
      arrival: '02:00 PM',
      travelTime: '3 hours',
      user: { name: 'Jane Smith', avatar: '/placeholder.svg' },
      baggage: '20 Kg',
    },
    {
      from: 'Tokyo',
      fromAirport: 'Narita Airport',
      to: 'Seoul',
      toAirport: 'Incheon Airport',
      departure: '06:00 AM',
      date: '25 May 2023',
      arrival: '08:00 AM',
      travelTime: '2 hours',
      user: { name: 'Akira Tanaka', avatar: '/placeholder.svg' },
      baggage: '10 Kg',
    },
  ];

  return (
    <>
      {/* Search Section */}
      <div className="bg-white/80 mt-28 px-4 border-0 border-wing-orange sm:border-2 backdrop-blur-sm rounded-lg p-4 max-w-6xl mx-auto mb-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-grow">
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
          <Input type="date" placeholder="Date" />
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
        </div>
        <Button className="w-full lg:w-auto lg:px-8 lg:self-stretch">Search</Button>
      </div>
    </div>

      {/* Cards Section */}
      <div className="max-w-6xl mx-auto  p-4">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside className="w-64  p-4 ">
            <h3 className="font-semibold mb-4">Class</h3>
            <form className="space-y-2">
              {[
                'Clothes and Textile',
                'Electronics',
                'Handicrafts',
                'Cosmetics',
                'Luxury',
                'Food and Beverages',
              ].map((item) => (
                <label key={item} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </form>
          </aside>

          {/* Tickets Section */}
          <main className="flex-1 grid gap-6 grid-cols-1 ">
            {cards.map((card, index) => (
              <Link
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-lg hover:border-2 hover:border-wing-orange "
                href="/card"
              >
                {/* Left Section */}
                <div className="flex gap-6 text-left p-6 justify-between">
                  <div  className="flex gap-6">
                  <div className="flex flex-col gap-2 text-left">
                  <strong className="text-lg text-gray-800">{card.departure}</strong>
                  <span className="text-sm text-gray-600">{card.fromAirport}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</span>
                    <span>{card.travelTime}</span>
                    <span className="text-lg">🌙</span>
                    <span>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</span>
                  </div>
                  <div className="flex flex-col gap-2 text-left">
                  <strong className="text-lg text-gray-800">{card.arrival}</strong>
                  <span className="text-sm text-gray-600">{card.toAirport}</span>
                  </div>
                  </div>
                  <div>
                    <p className="text-3xl text-gray-900"> 39 €</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-0.5 bg-gray-300"></div>

                {/* Right Section */}
                <div className="text-right px-3 py-3 flex gap-4">
                <img
                      src={plane.src}
                      alt="Description of the plane image"
                      className="-rotate-12"
                      style={{ zIndex: 2 }} 
                    />
                    <Link href="/userProfile">
                    <div className="flex items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={card.user.avatar} alt={card.user.name} />
                      <AvatarFallback>{card.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-black">{card.user.name}</p>
                    </div>
                    </div>
                   </Link>
                </div>
              </Link>
            ))}
          </main>
        </div>
      </div>
    </>
  );
}
