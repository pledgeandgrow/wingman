import React from 'react'
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export type FilterState = {
  priceRange: [number, number]
  departureTime: {
    morning: boolean
    afternoon: boolean
    evening: boolean
  }
  airlines: {
    [key: string]: boolean
  }
}

type FlightFilterProps = {
  filterState: FilterState
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>
}

export function FlightFilter({ filterState, setFilterState }: FlightFilterProps) {
  const handlePriceChange = (value: [number, number]) => {
    setFilterState(prev => ({ ...prev, priceRange: value }))
  }

  const handleDepartureTimeChange = (time: keyof FilterState['departureTime']) => {
    setFilterState(prev => ({
      ...prev,
      departureTime: { ...prev.departureTime, [time]: !prev.departureTime[time] }
    }))
  }

  const handleAirlineChange = (airline: string) => {
    setFilterState(prev => ({
      ...prev,
      airlines: { ...prev.airlines, [airline]: !prev.airlines[airline] }
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <Slider
          value={filterState.priceRange}
          onValueChange={handlePriceChange}
          max={1000}
          step={10}
        />
        <div className="flex justify-between mt-2">
          <span>${filterState.priceRange[0]}</span>
          <span>${filterState.priceRange[1]}</span>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Departure Time</h3>
        <div className="space-y-2">
          {Object.entries(filterState.departureTime).map(([time, checked]) => (
            <div key={time} className="flex items-center space-x-2">
              <Switch
                id={time}
                checked={checked}
                onCheckedChange={() => handleDepartureTimeChange(time as keyof FilterState['departureTime'])}
              />
              <Label htmlFor={time}>{time.charAt(0).toUpperCase() + time.slice(1)} (6{time === 'morning' ? 'AM' : 'PM'} - 12{time === 'evening' ? 'AM' : 'PM'})</Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Airlines</h3>
        <div className="space-y-2">
          {Object.entries(filterState.airlines).map(([airline, checked]) => (
            <div key={airline} className="flex items-center space-x-2">
              <Switch
                id={airline}
                checked={checked}
                onCheckedChange={() => handleAirlineChange(airline)}
              />
              <Label htmlFor={airline}>{airline}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

