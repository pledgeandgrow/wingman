"use client"

import { useEffect, useState } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import supabase from "@/utils/supabase"
import { Plane } from 'lucide-react'
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface User {
  id: string
  name: string
}

interface Flight {
  id: string
  flight_number: string
  departure_airport: string
  arrival_airport: string
  departure_time: string
  arrival_time: string
  available_weight: number
  wingman_id: string
  wingman?: User
  description: string
}

export default function MyFlights() {
  const [user, setUser] = useState<any>(null)
  const [flights, setFlights] = useState<Flight[]>([])
  const [activeTab, setActiveTab] = useState<string>('to-come')
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
 
  
  useEffect(() => {
    setMounted(true)
    const fetchUserData = async () => {
      setIsLoading(true)
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

      if (sessionError || !sessionData.session) {
        setUser(null)
        return
      }

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', sessionData.session.user.id)
        .single()

      if (userError) {
        console.error('Error fetching user data:', userError)
        setUser(null)
      } else {
        setUser(userData)
        fetchFlights(userData?.id)

      }
      setIsLoading(false)
    }

    fetchUserData()
  }, [])

  const fetchFlights = async (userId:string) => {
    const { data, error } = await supabase
      .from('flights')
      .select(`
        *,
        wingman:wingman_id (
          *
      )
      `)
      .eq('wingman_id',userId)

    if (error) {
      console.error('Error fetching flights:', error)
    } else {
      setFlights(data)
    }
  }
 

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center flex-col sm:flex-row flex-wrap gap-3 mb-8">
        <h1 className="text-2xl font-bold">Welcome {user?.name}</h1>
        <Link href={'/userDashboardGroup/postFlight'} className={buttonVariants()}>Post a flight</Link>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl text-center font-semibold">All Flights</h2>
        <FlightList user={user} setFlights={setFlights} flights={flights}/>
      </div>
    </main>
  )
}

function calculateDuration(departure: string, arrival: string): string {
  const start = new Date(departure)
  const end = new Date(arrival)
  const diff = end.getTime() - start.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  return `${hours} hours`
}

function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

function FlightList({ flights , setFlights , user }: { flights: Flight[] , setFlights:any , user:any }) {
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null)
  const editFlight=async (flightId:string) => {
    const { data, error } = await supabase
     .from('flights')
     .select()
     .eq('id', flightId)
     .single()

     setEditingFlight(data)
    
  }
  
  const updateFlight = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  if (!editingFlight) return 

  const formData = new FormData(e.currentTarget)
  const updatedFlight = {
    wingman_id: user?.id,
    departure_airport: formData.get('departure') as string,
    arrival_airport: formData.get('arrival') as string,
    departure_time: formData.get('departure-time') as string,
    arrival_time: formData.get('arrival-time') as string,
    description: formData.get('description') as string,
    flight_number: formData.get('flight_number') as string,
    available_weight: Number(formData.get('available_weight') as string), 
  }
  
  const { data: updatedFlightData, error } = await supabase
    .from('flights')
    .update(updatedFlight)
    .eq('id', editingFlight.id)
    .select()
    .single()

  if (error) {
    console.error('Error updating flight:', error)
  } else {
    setFlights((prevFlights: Flight[]) => 
      prevFlights.map(flight => 
        flight.id === updatedFlightData.id ? { ...flight, ...updatedFlightData } : flight
      )
    )
    setEditingFlight(null)
  }
}


  return (
    <div className="">
    <main className="flex-1 grid gap-6 grid-cols-1">
      {flights.map((flight, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg hover:border-2 hover:border-wing-orange transition-all"
        >
          {/* Left Section */}
          <div className="flex gap-6 text-left p-6 justify-between">
            <div className="flex gap-6">
              <div className="flex flex-col gap-2 text-left">
                <strong className="text-lg text-gray-800 dark:text-gray-200">{flight.departure_airport}</strong>
                <span className="text-sm text-gray-600 dark:text-gray-400">{formatTime(flight.departure_time)}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</span>
                <span>{calculateDuration(flight.departure_time, flight.arrival_time)}</span>
                <span className="text-lg">🌙</span>
                <span>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</span>
              </div>
              <div className="flex flex-col gap-2 text-left">
                <strong className="text-lg text-gray-800 dark:text-gray-200">{flight.arrival_airport}</strong>
                <span className="text-sm text-gray-600 dark:text-gray-400">{formatTime(flight.arrival_time)}</span>
              </div>
            </div>
            <div>
              <p className="text-3xl text-gray-900 dark:text-gray-100">{flight.available_weight} kg</p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>

          {/* Right Section */}
          <div className="text-right justify-between px-6 py-3 flex items-center gap-4">
            <div className="flex items-center">
              <Plane className="text-gray-600 dark:text-gray-400"/>
              <Link href={`/userProfile/${flight.wingman_id}`}>
                <div className="flex items-center">
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{flight.wingman?.name}</p>
                  </div>
                </div>
              </Link>
            </div>
            <Dialog open={!!editingFlight} onOpenChange={(open) => !open && setEditingFlight(null)}>
              <DialogTrigger asChild>
                <Button onClick={() => editFlight(flight.id)}>Edit Flight</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Flight</DialogTitle>
                </DialogHeader>
                <form onSubmit={updateFlight}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="flight_number" className="text-right">
                        Flight number
                      </Label>
                      <Input
                        id="flight_number"
                        name="flight_number"
                        defaultValue={editingFlight?.flight_number}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="departure" className="text-right">
                        Departure
                      </Label>
                      <Input
                        id="departure"
                        name="departure"
                        defaultValue={editingFlight?.departure_airport}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="arrival" className="text-right">
                        Arrival
                      </Label>
                      <Input
                        id="arrival"
                        name="arrival"
                        defaultValue={editingFlight?.arrival_airport}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="available_weight" className="text-right">
                        Available weight
                      </Label>
                      <Input
                        id="available_weight"
                        name="available_weight"
                        defaultValue={editingFlight?.available_weight}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="departure-time" className="text-right">
                        Departure Time
                      </Label>
                      <Input
                        id="departure-time"
                        name="departure-time"
                        type="datetime-local"
                        defaultValue={editingFlight?.departure_time}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="arrival-time" className="text-right">
                        Arrival Time
                      </Label>
                      <Input
                        id="arrival-time"
                        name="arrival-time"
                        type="datetime-local"
                        defaultValue={editingFlight?.arrival_time}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        defaultValue={editingFlight?.description}
                        className="col-span-3"
                      />
                    </div>
                    
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Save changes</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
    </main>
  </div>
  )
}

