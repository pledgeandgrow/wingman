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
import { Button, buttonVariants } from '@/components/ui/button'


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
    // Add more cards as needed
  ];

  return (
    <>
    <div className="bg-white/80 mt-20 mb-10 px-4 border-0   border-wing-orange sm:border-2 backdrop-blur-sm rounded-lg p-4 max-w-6xl mx-auto">
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
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Showing Results for</h2>
      </header>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <aside className="w-64 bg-white p-4 rounded-lg shadow">
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

          {/* Height and Width */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Height
            </label>
            <input type="range" className="w-full mt-2" />
            <label
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Width
            </label>
            <input type="range" className="w-full mt-2" />
          </div>

          {/* Weight */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Kilograms
            </label>
            <input type="range" className="w-full mt-2" />
          </div>
        </aside>

        {/* Tickets Section */}
        <main className="flex-1">
          <div className="w-full grid gap-6 grid-cols-1 md:grid-cols-1">
            {cards.map((card, index) => (
              <div key={index} className="bg-blue-900 rounded-xl shadow-lg">
                <div className="p-6">
                  <div className="flex items-center justify-between bg-white p-5 rounded-xl">
                    <div>
                      <h2 className="text-xl font-bold text-wing-blue">
                        {card.from}
                      </h2>
                      <p className="text-sm text-wing-blue">
                        {card.fromAirport}
                      </p>
                    </div>
                    <div className="flex-1 flex items-center justify-center mb-4">
                  <div className="relative w-[400px] ">
                    <img
                      src={line.src}
                      alt="Description of the line image"
                      className="w-full absolute top-1/2 left-0"
                      style={{ zIndex: 1 }} 
                    />
                    <img
                      src={plane.src}
                      alt="Description of the plane image"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  -rotate-12"
                      style={{ zIndex: 2 }} 
                    />
                  </div>
                </div>
                    <div className="text-right">
                      <h2 className="text-xl font-bold text-wing-blue">
                        {card.to}
                      </h2>
                      <p className="text-sm text-wing-blue">
                        {card.toAirport}
                      </p>
                    </div>
                  </div>

                  {/* Times */}
                  <div className="flex justify-between  p-5">
                    <div>
                      <p className="text-lg font-semibold text-white">
                        {card.departure}
                      </p>
                      <p className="text-sm text-gray-200">{card.date}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-200">Travel Time</p>
                      <div className="w-16 h-px bg-gray-300 my-2"></div>
                      <p className="text-sm text-white">
                        {card.travelTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">
                        {card.arrival}
                      </p>
                      <p className="text-sm text-gray-200">{card.date}</p>
                    </div>
                  </div>

                  {/* footer */}
                  <div className="px-6 pb-4 flex items-center justify-between rounded-b-xl">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={card.user.avatar}
                        alt={card.user.name}
                      />
                      <AvatarFallback>
                        {card.user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="text-sm text-gray-200">
                        {card.user.name}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/bookWingman"
                    className="px-4 py-2 bg-white text-blue-900 font-bold rounded-lg shadow-md"
                  >
                    {card.baggage}
                  </Link>
                </div>
                </div>

                {/* Footer */}
                
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center space-x-2 mt-6">
            {['1', '2', '3', '...',].map((item) => (
              <a
                key={item}
                href="#"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-blue-700 hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>
        </main>
      </div>
    </div>
    </>
  );
}
