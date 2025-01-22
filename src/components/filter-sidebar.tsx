'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Flight } from '@/app/types/flights'

export function EnhancedFilterSidebar({ 
  flights, 
  availableDates, 
  availableWeights 
}: { 
  flights: Flight[], 
  availableDates: string[], 
  availableWeights: number[] 
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // States for filters
  const [date, setDate] = useState<string>('')
  const [duration, setDuration] = useState<[number, number]>([0, 1000])
  const [weight, setWeight] = useState<number>(0) // Updated weight state
  
  // Calculate flight duration in hours
  const calculateDuration = (flight: Flight) => {
    const start = new Date(flight.departure_time)
    const end = new Date(flight.arrival_time)
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60) // Convert to hours
  }
  
  // Get max values from flights
  const maxDuration = Math.ceil(Math.max(...flights.map(calculateDuration), 0))
  const maxWeight = Math.max(...availableWeights, 0)

  useEffect(() => {
    const dateParam = searchParams.get('date') || ''
    const durParam = searchParams.get('duration')
    const weightParam = searchParams.get('weight')

    setDate(dateParam)
    if (durParam) setDuration(durParam.split(',').map(Number) as [number, number])
    if (weightParam) setWeight(Number(weightParam)) // Updated useEffect for weight
  }, [searchParams])

  const updateFilters = (
    newDate?: string,
    newDuration?: [number, number],
    newWeight?: number // Updated updateFilters function
  ) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (newDate !== undefined) {
      if (newDate) params.set('date', newDate)
      else params.delete('date')
    }
    
    if (newDuration !== undefined) {
      params.set('duration', newDuration.join(','))
    }
    
    if (newWeight !== undefined) {
      if (newWeight > 0) params.set('weight', newWeight.toString())
      else params.delete('weight')
    }
    
    router.push(`/flights?${params.toString()}`)
  }

  return (
    <Card className="w-full md:w-80">
      <CardHeader>
        <CardTitle>Filter Flights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Departure Date</label>
          <Select
            value={date}
            onValueChange={(value) => {
              setDate(value)
              updateFilters(value, duration, weight)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select date" />
            </SelectTrigger>
            <SelectContent>
              {availableDates.map((d) => (
                <SelectItem key={d} value={d}>
                  {new Date(d).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium">Flight Duration (hours)</label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={duration[0]}
              onChange={(e) => {
                const newValue = Number(e.target.value)
                setDuration([newValue, duration[1]])
                updateFilters(date, [newValue, duration[1]], weight)
              }}
              className="w-16 p-1 text-sm border rounded"
              min={0}
              max={duration[1]}
            />
            <Slider
              min={0}
              max={maxDuration}
              step={1}
              value={duration}
              onValueChange={(value) => {
                setDuration(value as [number, number])
                updateFilters(date, value as [number, number], weight)
              }}
              className="flex-1"
            />
            <input
              type="number"
              value={duration[1]}
              onChange={(e) => {
                const newValue = Number(e.target.value)
                setDuration([duration[0], newValue])
                updateFilters(date, [duration[0], newValue], weight)
              }}
              className="w-16 p-1 text-sm border rounded"
              min={duration[0]}
              max={maxDuration}
            />
          </div>
        </div>

        <div className="space-y-2"> {/* Updated weight filter section */}
          <label className="text-sm font-medium">Available Weight (kg)</label>
          <Select
            value={weight.toString()}
            onValueChange={(value) => {
              const newValue = Number(value)
              setWeight(newValue)
              updateFilters(date, duration, newValue)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select weight" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any weight</SelectItem>
              {availableWeights.map((w) => (
                <SelectItem key={w} value={w.toString()}>
                  {w} kg
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg bg-muted p-2 mb-2">
          <p className="text-xs text-muted-foreground">
            filter: Duration range: {duration[0]} - {duration[1]} hours
          </p>
        </div>
        <div className="rounded-lg bg-muted p-2 mb-2">
          <p className="text-xs text-muted-foreground">
            filter: Flight durations: {flights.map(f => Math.round(calculateDuration(f))).join(', ')} hours
          </p>
        </div>
        <div className="rounded-lg bg-muted p-2">
          <p className="text-sm text-muted-foreground">
            {flights.filter(flight => {
              const flightDate = new Date(flight.departure_time).toISOString().split('T')[0]
              const flightDuration = calculateDuration(flight)
              return (
                (!date || flightDate === date) &&
                flightDuration >= duration[0] &&
                flightDuration <= duration[1] &&
                (weight === 0 || flight.available_weight >= weight) // Updated flight filtering logic
              )
            }).length} flights found
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

