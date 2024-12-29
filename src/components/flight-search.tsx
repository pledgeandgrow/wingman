'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const AIRPORTS = [
  { value: 'JFK', label: 'New York (JFK)' },
  { value: 'LHR', label: 'London (Heathrow)' },
  { value: 'CDG', label: 'Paris (Charles de Gaulle)' },
  { value: 'NRT', label: 'Tokyo (Narita)' },
]

export function FlightSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newSearchParams.set(key, value)
        } else {
          newSearchParams.delete(key)
        }
      })
      
      return newSearchParams.toString()
    },
    [searchParams]
  )

  const handleSearch = (key: string, value: string) => {
    router.push(`/flights?${createQueryString({ [key]: value })}`)
  }

  return (
    <div className="bg-white/80 mt-28 px-4 border-0 border-wing-orange sm:border-2 backdrop-blur-sm rounded-lg p-4 max-w-6xl mx-auto mb-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-grow">
          <Select onValueChange={(value) => handleSearch('departure', value)}>
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
          
          <Select onValueChange={(value) => handleSearch('destination', value)}>
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
            onChange={(e) => handleSearch('date', e.target.value)}
          />
          
          <Select onValueChange={(value) => handleSearch('weight', value)}>
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
          onClick={() => router.push('/')}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

