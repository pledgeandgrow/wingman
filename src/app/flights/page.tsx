'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import { Plane } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import supabase from '@/utils/supabase'

interface Flight {
  id: string
  wingman_id: string
  flight_number: string
  departure_airport: string
  arrival_airport: string
  departure_time: string
  arrival_time: string
  available_weight: number
  description: string
}

interface FilterState {
  weightRange: [number, number]
  travelHoursRange: [number, number]
}

function FlightFilter({ filterState, setFilterState }: { 
  filterState: FilterState; 
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Available Weight Range (KG)</h3>
        <Slider
          min={0}
          max={100}
          step={1}
          value={filterState.weightRange}
          onValueChange={(value) => setFilterState(prev => ({ ...prev, weightRange: value as [number, number] }))}
        />
        <div className="flex justify-between mt-2">
          <span>{filterState.weightRange[0]} KG</span>
          <span>{filterState.weightRange[1]} KG</span>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Travel Hours Range</h3>
        <Slider
          min={0}
          max={200}
          step={1}
          value={filterState.travelHoursRange}
          onValueChange={(value) => setFilterState(prev => ({ ...prev, travelHoursRange: value as [number, number] }))}
        />
        <div className="flex justify-between mt-2">
          <span>{filterState.travelHoursRange[0]} hours</span>
          <span>{filterState.travelHoursRange[1]} hours</span>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [filterState, setFilterState] = useState<FilterState>({
    weightRange: [0, 100],
    travelHoursRange: [0, 200],
  })


  useEffect(() => {
    fetchFlights()
  }, [])

  const fetchFlights = async () => {
    const { data, error } = await supabase
      .from('flights')
      .select('*')

    if (error) {
      console.error('Error fetching flights:', error)
    } else {
      setFlights(data || [])
    }
  }

  const filteredFlights = useMemo(() => {
    return flights.filter(flight => {
      const travelHours = Math.round((new Date(flight.arrival_time).getTime() - new Date(flight.departure_time).getTime()) / 3600000)
      return (
        flight.available_weight >= filterState.weightRange[0] &&
        flight.available_weight <= filterState.weightRange[1] &&
        travelHours >= filterState.travelHoursRange[0] &&
        travelHours <= filterState.travelHoursRange[1]
      )
    })
  }, [flights, filterState])

  return (
    <div>
      {/* <div className="bg-white/80 mt-28 px-4 border-0 border-wing-orange sm:border-2 backdrop-blur-sm rounded-lg p-4 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-grow">
            <Input type="text" placeholder="Flight Number" />
            <Input type="date" placeholder="Departure Date" />
            <Input type="date" placeholder="Arrival Date" />
            <Input type="number" placeholder="Weight (KG)" />
          </div>
          <Button className="w-full lg:w-auto lg:px-8 lg:self-stretch" onClick={fetchFlights}>Search</Button>
        </div>
      </div> */}
      <h1 className='text-center font-bold mt-4 text-2xl'>All Flights </h1>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <FlightFilter filterState={filterState} setFilterState={setFilterState} />
          </div>
          <div className="w-full md:w-3/4">
            <div className="grid gap-6 grid-cols-1">
              {filteredFlights.map((flight) => (
                <div key={flight.id} className="bg-wing-blue rounded-xl">
                  <div className="rounded-lg overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-white">{flight.departure_airport}</h2>
                          <p className="text-sm text-gray-50">{flight.flight_number}</p>
                        </div>
                        <div className="flex-1 flex items-center justify-center mb-4">
                          <div className="w-full h-px bg-blue-300 relative">
                            <Plane className="absolute size-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500" />
                          </div>
                        </div>
                        <div className="flex-1 text-right">
                          <h2 className="text-xl font-bold text-white">{flight.arrival_airport}</h2>
                          <p className="text-sm text-gray-50">{flight.flight_number}</p>
                        </div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <div>
                          <p className="text-lg font-semibold text-white">
                            {new Date(flight.departure_time).toLocaleTimeString()}
                          </p>
                          <p className="text-sm text-gray-50">
                            {new Date(flight.departure_time).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-50">Travel time</p>
                          <div className="w-16 h-px bg-gray-300 my-2"></div>
                          <p className="text-xs text-white">
                            {Math.round((new Date(flight.arrival_time).getTime() - new Date(flight.departure_time).getTime()) / 3600000)} hours
                          </p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-white">
                            {new Date(flight.arrival_time).toLocaleTimeString()}
                          </p>
                          <p className="text-sm text-gray-50">
                            {new Date(flight.arrival_time).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 flex items-center justify-between">
                    <Link href={`/userProfile/${flight.wingman_id}`}>
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{flight.wingman_id[0]}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-50">Wingman</p>
                        </div>
                      </div>
                    </Link>
                    <Link
                      href={`/bookWingman/${flight.id}`}
                      className={`${buttonVariants({ variant: "outline" })} bg-white text-wing-blue font-bold`}
                    >
                      {flight.available_weight} KG
                    </Link>
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

