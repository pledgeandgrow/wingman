'use server'

import  supabase  from '@/utils/supabase'
import { Flight } from './types/flights'


export async function getAvailableWeights() {
  
  const { data, error } = await supabase
    .from('flights')
    .select('available_weight')
    .order('available_weight')

  if (error) {
    console.error('Error fetching available weights:', error)
    return []
  }

  return Array.from(new Set(data.map(item => item.available_weight)))
}

export async function getFlights(searchParams: { [key: string]: string | string[] | undefined }): Promise<Flight[]> {
  try {
    let query = supabase
    .from('flights')
    .select(`
      *,
      wingman:wingman_id (
        *
      )
    `)

    // Apply base filters
    if (searchParams.from) {
      query = query.eq('departure_airport', searchParams.from)
    }
    if (searchParams.to) {
      query = query.eq('arrival_airport', searchParams.to)
    }
    if (searchParams.date) {
      query = query.gte('departure_time', `${searchParams.date}T00:00:00`)
        .lt('departure_time', `${searchParams.date}T23:59:59`)
    }
    if (searchParams.weights) {
      const weights = Array.isArray(searchParams.weights) 
        ? searchParams.weights 
        : searchParams.weights.split(',')
      const minWeight = Math.min(...weights.map(Number).filter(w => !isNaN(w)))
      if (!isNaN(minWeight)) {
        query = query.gte('available_weight', minWeight)
      }
    }

    // Apply sorting
    const sortBy = Array.isArray(searchParams.sortBy) ? searchParams.sortBy[0] : searchParams.sortBy
    switch (sortBy) {
      case 'weight-desc':
        query = query.order('available_weight', { ascending: false })
        break
      case 'weight-asc':
        query = query.order('available_weight', { ascending: true })
        break
      default:
        query = query.order('created_at', { ascending: false })
    }

    const { data: flights, error } = await query

    if (error) {
      console.error('Error fetching flights:', error)
      return []
    }

    let filteredFlights = flights as Flight[]

    // Apply post-fetch filters
    if (searchParams.hours) {
      const targetHours = Array.isArray(searchParams.hours) 
        ? searchParams.hours 
        : searchParams.hours.split(',')
      filteredFlights = filteredFlights.filter(flight => {
        const duration = (new Date(flight.arrival_time).getTime() - 
                         new Date(flight.departure_time).getTime()) / (1000 * 60 * 60)
        return targetHours.map(Number).filter(h => !isNaN(h)).includes(Math.round(duration))
      })
    }

    // Apply post-fetch sorting
    if (sortBy?.includes('duration')) {
      filteredFlights.sort((a, b) => {
        const durationA = new Date(a.arrival_time).getTime() - new Date(a.departure_time).getTime()
        const durationB = new Date(b.arrival_time).getTime() - new Date(b.departure_time).getTime()
        return sortBy === 'duration-asc' ? durationA - durationB : durationB - durationA
      })
    }

    return filteredFlights
  } catch (error) {
    console.error('Error in getFlights:', error)
    return []
  }
}

export async function createCheckoutSession(flightId: string) {
  try {
    const { data, error } = await supabase.rpc('create_stripe_checkout_session', {
      flight_id: flightId,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    })

    if (error) throw error

    return { sessionId: data.id, url: data.url }
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}


