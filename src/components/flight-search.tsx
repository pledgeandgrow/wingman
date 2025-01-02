'use client'

import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const AIRPORTS = [
  { value: 'JFK', label: 'New York (JFK)' },
  { value: 'LHR', label: 'London (Heathrow)' },
  { value: 'CDG', label: 'Paris (Charles de Gaulle)' },
  { value: 'NRT', label: 'Tokyo (Narita)' },
]

export function FlightSearch({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const router = useRouter()

  const handleSearch = (params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams as Record<string, string>)
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value)
      } else {
        newSearchParams.delete(key)
      }
    })
    router.push(`/flights?${newSearchParams.toString()}`)
  }

  return (
    <div className="bg-white/80 mt-28 px-4 border-0 border-wing-orange sm:border-2 backdrop-blur-sm rounded-lg p-4 max-w-6xl mx-auto mb-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-grow">
          <Select 
            onValueChange={(value) => handleSearch({ departure: value })}
            defaultValue={searchParams.departure as string}
          >
            <SelectTrigger>
              <SelectValue placeholder="Departure" />
            </SelectTrigger>
            <SelectContent>
              {AIRPORTS.map((airport) => (
                <SelectItem key={airport.value} value={airport.value}>
                  {airport.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            onValueChange={(value) => handleSearch({ destination: value })}
            defaultValue={searchParams.destination as string}
          >
            <SelectTrigger>
              <SelectValue placeholder="Destination" />
            </SelectTrigger>
            <SelectContent>
              {AIRPORTS.map((airport) => (
                <SelectItem key={airport.value} value={airport.value}>
                  {airport.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Input 
            type="date" 
            placeholder="Date" 
            onChange={(e) => handleSearch({ date: e.target.value })}
            defaultValue={searchParams.date as string}
          />
          
          <Select 
            onValueChange={(value) => handleSearch({ weight: value })}
            defaultValue={searchParams.weight as string}
          >
            <SelectTrigger>
              <SelectValue placeholder="Kilograms" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 15, 20].map((kg) => (
                <SelectItem key={kg} value={kg.toString()}>
                  {kg} kg
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button 
          className="w-full lg:w-auto lg:px-8 lg:self-stretch"
          onClick={() => router.push('/flights')}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

