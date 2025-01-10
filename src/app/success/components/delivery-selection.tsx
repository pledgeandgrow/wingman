'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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

type Delivery = {
  id: string
  pickup_location: string
  dropoff_location: string
  item_description: string
  item_weight: number
  status: string
}

export function DeliverySelection({ deliveries }: { deliveries: Delivery[] }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSelectDelivery = async (deliveryId: string) => {
    setIsLoading(true)
    const WINGMAN_ID = '22b8356e-ad1c-4863-86ba-080e627bcc66'

    try {
      const { data, error } = await supabase
        .from('flights')
        .insert([
          { delivery_id: deliveryId, wingman_id: WINGMAN_ID }
        ])
        .select()

      if (error) throw error

      // Assuming the insert was successful and returned the new flight data
      router.push(`/flight/${data[0].id}`)
    } catch (error) {
      console.error('Error creating flight:', error)
      alert('Failed to create flight. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
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
                <Button 
                  onClick={() => handleSelectDelivery(delivery.id)}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Select for Flight'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

