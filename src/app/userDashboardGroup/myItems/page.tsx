"use client"

import { useEffect, useState } from 'react'
import Link from "next/link"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2, Plane, Package, MapPin, Calendar, Clock } from 'lucide-react'
import supabase from '@/utils/supabase'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DeleteDeliveryDialog } from './components/DeleteDeliveryDialog'
import { formatDistanceToNow } from 'date-fns'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import EditDelivery from './components/EditDeliveryDialog'

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
  item_height: number
  item_width: number
  receiver: {
    name: string
  }
}

const DELIVERY_STATUSES = ['all', 'pending', 'in transit', 'delivered', 'canceled'] as const
type DeliveryStatus = typeof DELIVERY_STATUSES[number]

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
  const [filteredDeliveries, setFilteredDeliveries] = useState<Delivery[]>([])
  const [selectedStatus, setSelectedStatus] = useState<DeliveryStatus>('all')
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

        let query = supabase
          .from('deliveries')
          .select(`
            *,
            receiver:receiver_id(
              *
            )
            `)
            
            
          .eq('sender_id', user?.id)

        if (selectedStatus !== 'all') {
          query = query.eq('status', selectedStatus)
        }

        const { data: deliveriesData, error: deliveriesError } = await query
        if (deliveriesError) throw new Error(deliveriesError.message)
        setDeliveries(deliveriesData as Delivery[])
        setFilteredDeliveries(deliveriesData as Delivery[])

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [selectedStatus])

  const handleEditDelivery = (delivery: Delivery) => {
    setEditingDelivery(delivery)
  }

  const handleDeleteDelivery = (delivery: Delivery) => {
    setDeletingDelivery(delivery)
  }

  const handleEditComplete = (updatedDelivery: Delivery) => {
    const updatedDeliveries = deliveries.map(d => 
      d.id === updatedDelivery.id ? updatedDelivery : d
    )
    setDeliveries(updatedDeliveries)
    setFilteredDeliveries(updatedDeliveries)
    setEditingDelivery(null)
  }

  const handleDeleteComplete = (deletedDeliveryId: string) => {
    const remainingDeliveries = deliveries.filter(d => d.id !== deletedDeliveryId)
    setDeliveries(remainingDeliveries)
    setFilteredDeliveries(remainingDeliveries)
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
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Items</h1>
            <p className="text-sm text-gray-500">These companies have purchased in the last 12 months.</p>
          </div>
          <Link href="/userDashboardGroup/registerItem">
            <Button variant="default">
              <Package className="h-4 w-4 mr-2" />
              Register Item
            </Button>
          </Link>
        </div>

        <Tabs value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as DeliveryStatus)}>
          <TabsList className="w-full h-12 mb-8 bg-white rounded-lg shadow">
            {DELIVERY_STATUSES.map((status) => (
              <TabsTrigger
                key={status}
                value={status}
                className="flex-1 data-[state=active]:bg-wing-blue data-[state=active]:text-white"
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedStatus}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDeliveries.map((delivery) => (
                <div key={delivery.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{delivery.item_description.split(' ')[0]}</div>
                          <div className="text-sm text-gray-500">
                            {delivery.item_description.length > 20
                              ? delivery.item_description.substring(0, 20) + '...'
                              : delivery.item_description}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {delivery.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Dimensions</div>
                        <div className="text-sm text-gray-900">{delivery.item_height} x {delivery.item_width} x {delivery.item_weight} cm</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Weight</div>
                        <div className="text-sm text-gray-900">{delivery.item_weight} KG</div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-500">Route</div>
                      <div className="text-sm text-gray-900">
                        From {delivery.pickup_location} to {delivery.dropoff_location}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {delivery.receiver?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-sm font-medium text-gray-900">{delivery.receiver?.name}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditDelivery(delivery)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteDelivery(delivery)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {editingDelivery && (
        <EditDelivery
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

