"use client"
import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import supabase from '@/utils/supabase'
import { useSupabaseUser } from '../hooks/getSession'
import React, { useEffect, useState } from 'react'

export const dynamic = 'force-dynamic'

export default  function SelectDeliveryPage({ searchParams }: { searchParams: { flightId: string } }) {
  const [deliveries,setDeliveries]=useState([])
  
 

 useEffect(() => {
     const getDeliveries=async()=>{
      const {data:{user}}=await supabase.auth.getUser()  

      const { data: deliveries, error } = await supabase
      .from('deliveries')
      .select('*')
      .eq('sender_id', user?.id)
    
    if (error) {
      console.error('Error fetching deliveries:', error)
      return <div>Error loading deliveries. Please try again.</div>
    }
    setDeliveries(deliveries)

      
     }
     getDeliveries()
 
   
 }, [])
 
 const resolvedParams = React.use(searchParams)

  async function createFlight(formData: FormData) {
    
    const deliveryId = formData.get('deliveryId') as string
    const { data:flightwing, error:otherErorr } = await supabase
      .from('flights')
      .select(`
            *,
            wingman:wingman_id(*)
           `)
      
      .eq('id', resolvedParams?.flightId)
      
      console.log(flightwing)


    const { data, error } = await supabase
      .from('deliveries')
      .update([
        { flight_id: resolvedParams?.flightId, wingman_id: '22b8356e-ad1c-4863-86ba-080e627bcc66' }
      ])
      .eq('id', deliveryId)
      .select()

    if (error) {
      console.error('Error creating flight:', error)
      return { success: false, error: 'Failed to create flight' }
    }
    console.log(data)

  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Select an item for this Flight</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pickup Location</TableHead>
              <TableHead>Dropoff Location</TableHead>
              <TableHead>Item Description</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveries.map((delivery) => (
              <TableRow key={delivery.id}>
                <TableCell>{delivery.pickup_location}</TableCell>
                <TableCell>{delivery.dropoff_location}</TableCell>
                <TableCell>{delivery.item_description}</TableCell>
                <TableCell>{delivery.item_weight} kg</TableCell>
                <TableCell>{delivery.status}</TableCell>
                <TableCell>
                  <form action={createFlight}>
                    <input type="hidden" name="deliveryId" value={delivery.id} />
                    <Button type="submit">
                      Select for Flight
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
            {deliveries.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  You don't have any deliveries yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

