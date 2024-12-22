"use client"

import { useEffect, useState } from 'react'
import Link from "next/link"
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import supabase from '@/utils/supabase'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EditDeliveryDialog } from './components/EditDeliveryDialog'
import { DeleteDeliveryDialog } from './components/DeleteDeliveryDialog'

interface User {
  id: string
  user_metadata: {
    name: string
  }
}

interface Delivery {
  id: string
  item_description: string
  item_weight: number
  status: string
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

        // Fetch user data
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError) throw new Error(userError.message)
          setUser(user as any)

        // Fetch deliveries data
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
    <div className='min-h-screen px-4'>
      <main className=" mx-auto px-4 py-8">
        <div className="flex justify-between flex-col sm:flex-row items-center gap-5 mb-8">
          <h1 className="text-2xl font-bold">Welcome {user?.user_metadata.name}</h1>
          <Link href="/userDashboardGroup/registerItem">
            <Button>Register a package</Button>
          </Link>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold">My items</h2>
          
          {deliveries.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Weight (KG)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deliveries.map((delivery) => (
                  <TableRow key={delivery.id}>
                    <TableCell>{delivery.id.slice(0, 10)}</TableCell>
                    <TableCell>{delivery.item_description}</TableCell>
                    <TableCell>{delivery.item_weight}</TableCell>
                    <TableCell>{delivery.status}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => handleEditDelivery(delivery)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteDelivery(delivery)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-gray-500">No items registered yet.</p>
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

