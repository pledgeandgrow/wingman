import { Suspense } from 'react'
import { getFlights } from '../actions'
import { FlightSearch } from '@/components/flight-search'
import { FlightCard } from '@/components/flight-card'
import { SearchParams } from '../types/flights'

export default async function FlightsPage({
  searchParams,
}: {
  searchParams
}) {
  const flights = await getFlights(searchParams)

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <FlightSearch />
      
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-64 p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold mb-4">Available Weight</h3>
            <div className="space-y-2">
              {[5, 10, 15, 20].map((weight) => (
                <div key={weight} className="flex items-center justify-between">
                  <span>{weight} kg</span>
                  <span className="text-gray-500">
                    {flights.filter(f => f.available_weight >= weight).length} flights
                  </span>
                </div>
              ))}
            </div>
          </aside>

          <main className="flex-1 grid gap-6 grid-cols-1">
            <Suspense fallback={<div>Loading flights...</div>}>
              {flights.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <p className="text-lg text-gray-500">No flights found matching your criteria</p>
                </div>
              ) : (
                flights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))
              )}
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}

