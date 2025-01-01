'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Flight } from '@/app/types/flights'

export function FilterSidebar({ flights }: { flights: Flight[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedWeights, setSelectedWeights] = useState<number[]>([])

  useEffect(() => {
    const weights = searchParams.get('weights')
    if (weights) {
      setSelectedWeights(weights.split(',').map(Number))
    }
  }, [searchParams])

  const updateWeightFilter = (weight: number) => {
    const newWeights = selectedWeights.includes(weight)
      ? selectedWeights.filter(w => w !== weight)
      : [...selectedWeights, weight]
    
    const params = new URLSearchParams(searchParams.toString())
    if (newWeights.length > 0) {
      params.set('weights', newWeights.join(','))
    } else {
      params.delete('weights')
    }
    
    router.push(`/flights?${params.toString()}`)
  }

  return (
    <div className="w-full md:w-64 p-4 bg-white rounded-lg shadow">
      <h3 className="font-semibold mb-4">Available Weight</h3>
      <div className="space-y-2">
        {[5, 10, 15, 20].map((weight) => (
          <div key={weight} className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedWeights.includes(weight)}
                onChange={() => updateWeightFilter(weight)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span>{weight} kg</span>
            </label>
            <span className="text-gray-500">
              {flights.filter(f => f.available_weight >= weight).length} flights
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

