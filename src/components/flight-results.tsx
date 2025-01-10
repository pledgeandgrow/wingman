'use client'

import { FlightCard } from '@/components/flight-card'
import { Flight } from '@/app/types/flights'

export function FlightResults({ flights }: { flights: Flight[] }) {
  return (
    <div className="flex-1">
      <div className="grid gap-6 grid-cols-1">
        {flights.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-lg text-gray-500">No flights found matching your criteria</p>
          </div>
        ) : (
          flights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))
        )}
      </div>
    </div>
  )
}

