"use client"

import { redirect } from "next/navigation"
import { Button, buttonVariants } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import supabase from "@/utils/supabase"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

export const dynamic = "force-dynamic"

export default function SelectDelivery({ flightId, onSelectDelivery }) {
  const [deliveries, setDeliveries] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const getDeliveries = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          console.error("No user found")
          setError("No user found")
          return
        }

        const { data: deliveries, error } = await supabase.from("deliveries").select("*").eq("sender_id", user.id)

        if (error) {
          console.error("Error fetching deliveries:", error)
          setError("Error loading deliveries. Please try again.")
          return
        }

        console.log("Fetched deliveries:", deliveries)
        setDeliveries(deliveries)
      } catch (err) {
        console.error("Unexpected error:", err)
        setError("An unexpected error occurred")
      }
    }

    getDeliveries()
  }, [])

  async function createFlight(formData: FormData) {
    const deliveryId = formData.get("deliveryId") as string

    const { data: flightwing, error: flightError } = await supabase
      .from("flights")
      .select(`
        *,
        wingman:wingman_id(*)
      `)
      .eq("id", flightId)
      .single()

    if (flightError) {
      console.error("Error fetching flight:", flightError)
      return { success: false, error: "Failed to fetch flight data" }
    }

    if (!flightwing) {
      console.error("Flight data is null")
      return { success: false, error: "Flight data not found" }
    }

    if (!flightwing.wingman || !flightwing.wingman.id) {
      console.error("Wingman data is missing or incomplete")
      return { success: false, error: "Wingman data is missing" }
    }

    const { data, error } = await supabase
      .from("deliveries")
      .update([{ flight_id: flightId, wingman_id: flightwing.wingman.id }])
      .eq("id", deliveryId)

    if (error) {
      console.error("Error updating delivery:", error)
      return { success: false, error: "Failed to update delivery" }
    }

    console.log("Updated delivery:", data)
    onSelectDelivery(deliveryId)
    toast({
      title: "Success",
      description: "You added the item to the flight. You can now book.",
      variant: "default",
    })
    return { success: true, data }
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
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
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      const formData = new FormData(e.target)
                      const result = await createFlight(formData)
                      if (result.success) {
                        console.log("Success:", result.data)
                      } else {
                        console.error("Error:", result.error)
                        setError(result.error)
                      }
                    }}
                  >
                    <input type="hidden" name="deliveryId" value={delivery.id} />
                    <Button type="submit">Select for Flight</Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
            {deliveries.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  You don't have any deliveries yet <br />
                  <Link className={`${buttonVariants()} mt-3`} href={"/userDashboardGroup/registerItem"}>
                    Create one?
                  </Link>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

