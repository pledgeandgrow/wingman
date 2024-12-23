"use client"

import { useEffect, useState } from 'react'
import Link from "next/link"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2, Plane, Package, MapPin, Calendar, Clock } from 'lucide-react'
import supabase from '@/utils/supabase'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from "@/components/ui/badge"
import { EditDeliveryDialog } from './components/EditDeliveryDialog'
import { DeleteDeliveryDialog } from './components/DeleteDeliveryDialog'
import { formatDistanceToNow } from 'date-fns'

interface User {
  id: string
  user_metadata: {
    name: string
  }
}

interface Delivery {
  id: string
  sender_id: string
  wingman_id: string
  receiver_id: string
  flight_id: string
  pickup_location: string
  dropoff_location: string
  item_description: string
  item_weight: number
  status: string
  created_at: string
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'in transit':
      return 'bg-blue-100 text-blue-800'
    case 'delivered':
      return 'bg-green-100 text-green-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingDelivery, setEditingDelivery] = useState<Delivery | null>(null)
  const [deletingDelivery, setDeletingDelivery] = useState<Delivery | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        setError(null)

        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError) throw new Error(userError.message)
        setUser(user as any)

        const { data: deliveriesData, error: deliveriesError } = await supabase
          .from('deliveries')
          .select('*')
          .eq('sender_id', user?.id)
        if (deliveriesError) throw new Error(deliveriesError.message)
        setDeliveries(deliveriesData as Delivery[])

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleEditDelivery = (delivery: Delivery) => {
    setEditingDelivery(delivery)
  }

  const handleDeleteDelivery = (delivery: Delivery) => {
    setDeletingDelivery(delivery)
  }

  const handleEditComplete = (updatedDelivery: Delivery) => {
    setDeliveries(deliveries.map(d => d.id === updatedDelivery.id ? updatedDelivery : d))
    setEditingDelivery(null)
  }

  const handleDeleteComplete = (deletedDeliveryId: string) => {
    setDeliveries(deliveries.filter(d => d.id !== deletedDeliveryId))
    setDeletingDelivery(null)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen '>
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between flex-col sm:flex-row items-center gap-5 mb-8">
        <div>
          <h1 className="text-3xl font-bold "> Dashboard des items</h1>
          <p className="text-wing-blue dark:text-blue-300 mt-2">Welcome back, {user?.user_metadata.name}</p>
        </div>
        <Link href="/userDashboardGroup/registerItem">
          <Button className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Register New Shipment
          </Button>
        </Link>
      </div>
  
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold ">Les items actives</h2>
          <Badge variant="secondary" className="px-3 py-1">
            {deliveries.length} Total
          </Badge>
        </div>
  
        {deliveries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliveries.map((delivery) => (
              <Card key={delivery.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="border-b  ">
                  <div className="flex justify-center gap-4 items-start flex-wrap">
                    <CardTitle className="text-lg font-semibold line-clamp-2">
                      {delivery.item_description}
                    </CardTitle>
                    <Badge className={getStatusColor(delivery.status) }>
                      {delivery.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <Image
                      src="https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Air Cargo"
                      fill
                      className="object-cover"
                    />
                  </div>
  
                  <div className="grid gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-1 shrink-0" />
                      <div>
                        <p className="font-medium">Pickup Location</p>
                        <p className="text-gray-600">{delivery.pickup_location}</p>
                      </div>
                    </div>
  
                    <div className="flex items-start gap-2">
                      <Plane className="h-4 w-4 text-gray-500 mt-1 shrink-0" />
                      <div>
                        <p className="font-medium">Destination</p>
                        <p className="text-gray-600">{delivery.dropoff_location}</p>
                      </div>
                    </div>
  
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{delivery.item_weight} KG</span>
                      </div>
                      <div className="flex items-start gap-2 justify-center">
                        <Clock className="h-4 mt-1 w-4 text-gray-500" />
                        
                        <span className="text-gray-600">  
                           added {formatDistanceToNow(new Date(delivery.created_at), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 border-t p-3">
                  <Button variant="outline" size="sm" onClick={() => handleEditDelivery(delivery)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteDelivery(delivery)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border">
            <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Shipments Yet</h3>
            <p className="text-gray-500 mb-4">Start by registering your first air cargo shipment</p>
            <Link href="/userDashboardGroup/registerItem">
              <Button variant="outline">Register New Shipment</Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  
    {editingDelivery && (
      <EditDeliveryDialog
        delivery={editingDelivery}
        onClose={() => setEditingDelivery(null)}
        onEdit={handleEditComplete}
      />
    )}
  
    {deletingDelivery && (
      <DeleteDeliveryDialog
        delivery={deletingDelivery}
        onClose={() => setDeletingDelivery(null)}
        onDelete={handleDeleteComplete}
      />
    )}
  </div>
  
  )
}

