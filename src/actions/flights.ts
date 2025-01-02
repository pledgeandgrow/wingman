'use server'

import { SearchParams } from '@/app/types/flights'
import supabase from '@/utils/supabase'

export async function getFlights(searchParams: any) {
  let query = supabase
    .from('flights')
    .select('*')

  if (searchParams.departure) {
    query = query.eq('departure_airport', searchParams.departure)
  }

  if (searchParams.destination) {
    query = query.eq('arrival_airport', searchParams.destination)
  }

  if (searchParams.date) {
    // Convert date to start and end of day
    const startDate = new Date(searchParams.date)
    const endDate = new Date(searchParams.date)
    endDate.setDate(endDate.getDate() + 1)
    
    query = query.gte('departure_time', startDate.toISOString())
      .lt('departure_time', endDate.toISOString())
  }

  if (searchParams.weight) {
    query = query.gte('available_weight', parseInt(searchParams.weight))
  }

  const { data: flights, error } = await query

  if (error) {
    console.error('Error fetching flights:', error)
    return []
  }

  return flights
}

