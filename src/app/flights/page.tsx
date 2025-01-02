import { Suspense } from 'react'
import { getFlights } from '../actions'
import { FlightSearch } from '@/components/flight-search'
import { FlightResults } from '@/components/flight-results'
import { FilterSidebar } from '@/components/filter-sidebar'
import { SearchParams } from '../types/flights'

export default async function FlightsPage({
  searchParams,
}: {
  searchParams: any
}) {
  const flights = await getFlights(searchParams)

  return (
    <div  className="bg-[#F5F5F5] min-h-screen">
      <FlightSearch />
      
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          <Suspense fallback={<div>Loading filters...</div>}>
            <FilterSidebar flights={flights} />
          </Suspense>

          <Suspense fallback={<div>Loading flights...</div>}>
            <FlightResults flights={flights} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

