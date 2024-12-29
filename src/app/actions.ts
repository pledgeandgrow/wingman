'use server'

import supabase from '@/utils/supabase'
import { SearchParams } from './types/flights'

export async function getFlights(searchParams: SearchParams = {}) {
  let query = supabase
    .from('flights')
    .select(`
      *,
      wingman:wingman_id (
        id,
        name
      )
    `)

  if (searchParams.departure) {
    query = query.eq('departure_airport', searchParams.departure)
  }
  
  if (searchParams.destination) {
    query = query.eq('arrival_airport', searchParams.destination)
  }
  
  if (searchParams.date) {
    // Convert date to start and end of day
    const startDate = new Date(searchParams.date)
    startDate.setHours(0, 0, 0, 0)
    const endDate = new Date(searchParams.date)
    endDate.setHours(23, 59, 59, 999)
    
    query = query.gte('departure_time', startDate.toISOString())
      .lte('departure_time', endDate.toISOString())
  }
  
  if (searchParams.weight) {
    query = query.gte('available_weight', parseInt(searchParams.weight))
  }

  const { data: flights, error } = await query

  if (error) {
    console.error('Error fetching flights:', error)
    return []
  }

  return flights || []
}

