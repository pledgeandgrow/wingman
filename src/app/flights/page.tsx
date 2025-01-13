import { Suspense } from 'react'
import { getFlights, getAvailableWeights } from '../actions'
import { FlightResults } from '@/components/flight-results'
import  { EnhancedFilterSidebar } from '@/components/filter-sidebar'

export const dynamic = 'force-dynamic'

export default async function FlightsPage({
  searchParams,
}: {
  searchParams: any
}) {
  const flights = await getFlights(searchParams)
  const availableWeights = await getAvailableWeights()
  
  // Get unique dates from flights
  const availableDates = Array.from(new Set(flights.map(flight => 
    new Date(flight.departure_time).toISOString().split('T')[0]
  ))).sort()

  // Calculate flight duration in hours
  const calculateDuration = (flight:any) => {
    const start = new Date(flight.departure_time)
    const end = new Date(flight.arrival_time)
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60) // Convert to hours
  }

  // Filter flights based on search params
  const filteredFlights = flights.filter(flight => {
    const date = searchParams.date
    const duration = searchParams.duration?.split(',').map(Number)
    const weight = Number(searchParams.weight) || 0
    
    const flightDate = new Date(flight.departure_time).toISOString().split('T')[0]
    const flightDuration = calculateDuration(flight)

    if (date && flightDate !== date) return false
    
    if (duration && (flightDuration < duration[0] || flightDuration > duration[1])) return false
    
    if (weight > 0 && flight.available_weight < weight) return false
    
    return true
  })

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          <Suspense fallback={<div>Loading filters...</div>}>
            <EnhancedFilterSidebar 
              flights={flights} 
              availableDates={availableDates} 
              availableWeights={availableWeights}
            />
          </Suspense>

          <Suspense fallback={<div>Loading flights...</div>}>
            <FlightResults flights={filteredFlights} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

