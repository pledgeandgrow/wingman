'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getFlights } from '@/app/actions'
import { Flight } from '@/app/types/flights'
import { format, differenceInMinutes } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Clock, Plane, Weight, User, Mail } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { useSupabaseUser } from '@/app/hooks/getSession'



const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC!)

async function getFlightDetails(id: string): Promise<Flight | null> {
  const flights = await getFlights({ id })
  return flights.length > 0 ? flights[0] : null
}

export default function FlightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [flight, setFlight] = useState<Flight | null>(null)
  const {user} = useSupabaseUser()


  const resolvedParams = React.use(params)

  useEffect(() => {
    getFlightDetails(resolvedParams.slug).then(setFlight)
  }, [resolvedParams.slug])

  if (!flight) {
    return <div>Loading...</div>
  }

  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy HH:mm")
  }

  const calculateDuration = () => {
    const departure = new Date(flight.departure_time)
    const arrival = new Date(flight.arrival_time)
    const durationInMinutes = differenceInMinutes(arrival, departure)
    const hours = Math.floor(durationInMinutes / 60)
    const minutes = durationInMinutes % 60
    return `${hours}h ${minutes}m`
  }

  const handleBooking = async () => {
    if (!user) {
      // Redirect to login or show a message
      router.push('/login')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flightId: params.slug,
          userId: user.id,
          email: user.email,
        })
      })
      const { sessionId } = await response.json()
      if (sessionId) {
        const stripe = await stripePromise
        const { error } = await stripe!.redirectToCheckout({ sessionId })
        if (error) {
          console.error('Error redirecting to checkout:', error)
        }
      } else {
        throw new Error('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-wing-blue to-wing-cyan text-white">
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold">Flight {flight.flight_number}</CardTitle>
            <Badge variant="secondary" className="text-lg">
              {calculateDuration()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Flight Information</h2>
              <div className="flex items-center space-x-2">
                <Plane className="text-blue-500" />
                <div>
                  <p className="font-medium">{flight.departure_airport} → {flight.arrival_airport}</p>
                  <p className="text-sm text-gray-500">
                    {formatDateTime(flight.departure_time)} - {formatDateTime(flight.arrival_time)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Weight className="text-green-500" />
                <p><span className="font-medium">Available Weight:</span> {flight.available_weight} kg</p>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="text-orange-500" />
                <p><span className="font-medium">Created at:</span> {formatDateTime(flight.created_at)}</p>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Wingman Information</h2>
              <div className="flex items-center space-x-2">
                <User className="text-indigo-500" />
                <p><span className="font-medium">Name:</span> {flight.wingman.name}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="text-red-500" />
                <p><span className="font-medium">Email:</span> {flight.wingman.email}</p>
              </div>
            </div>
          </div>
          <Separator className="my-6" />
          <div>
            <h2 className="text-2xl font-semibold mb-4">Flight Description</h2>
            <p className="text-gray-700 leading-relaxed">{flight.description}</p>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 p-6">
          <Button 
            onClick={handleBooking} 
            disabled={loading}
            className="w-full bg-wing-blue hover:bg-wing-cyan text-white font-bold py-2 px-4 rounded"
          >
            {loading ? 'Processing...' : 'Book this Flight'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

