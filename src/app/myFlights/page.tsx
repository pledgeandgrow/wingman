"use client"

import { useEffect, useState } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import supabase from "@/utils/supabase"
import { Plane } from 'lucide-react'
import Link from "next/link"

interface Flight {
  id: string
  flight_number: string
  departure_airport: string
  arrival_airport: string
  departure_time: string
  arrival_time: string
  available_weight: number
  status: 'to-come' | 'finished' | 'cancelled'
}

export default function MyFlights() {
  const [user, setUser] = useState<any>(null)
  const [flights, setFlights] = useState<any>([])
  const [activeTab, setActiveTab] = useState<string>('to-come')

  useEffect(() => {
    const fetchUserData = async () => {
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
      }
    }

    fetchUserData()
    fetchFlights()
  }, [])

  const fetchFlights = async () => {
    const { data, error } = await supabase
      .from('flights')
      .select('*')

    if (error) {
      console.error('Error fetching flights:', error)
    } else {
      setFlights(data)
    }
  }

 

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome {user?.name}</h1>
        <Link href={'/post-flight'} className={`bg-[#002466] hover:bg-[#002466]/90 text-white ${buttonVariants()}`}>Post a flight</Link>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl text-center font-semibold">All Flights</h2>
        
        <FlightList flights={flights}/>
      </div>
    </main>
  )
}

function FlightList({ flights }: { flights: Flight[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {flights.map((flight) => (
        <Card key={flight.id} className="bg-[#002466] text-white p-6 relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
             
              <div className="text-sm opacity-80">{flight.departure_airport}</div>
              <div className="text-sm opacity-80">{flight.arrival_airport}</div>
            </div>
            <div className="text-sm opacity-80">
              FLIGHT NUMBER
              <div>{flight.flight_number}</div>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-sm opacity-80">DATE & TIME</div>
              <div>{new Date(flight.departure_time).toLocaleString()}</div>
            </div>
            <div className="text-xl font-bold"> {flight.available_weight} KG</div>
          </div>
        </Card>
      ))}
    </div>
  )
}

