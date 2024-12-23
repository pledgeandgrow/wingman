"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import supabase from '@/utils/supabase'

interface Delivery {
  id: string
  item_description: string
  item_weight: number
  status: string
}

interface EditDeliveryDialogProps {
  delivery: Delivery
  onClose: () => void
  onEdit: (updatedDelivery: any) => void
}

export function EditDeliveryDialog({ delivery, onClose, onEdit }: EditDeliveryDialogProps) {
  const [description, setDescription] = useState(delivery.item_description)
  const [weight, setWeight] = useState(delivery.item_weight.toString())
  const [status, setStatus] = useState(delivery.status)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase
        .from('deliveries')
        .update({
          item_description: description,
          item_weight: parseFloat(weight),
        })
        .eq('id', delivery.id)
        .select()

      if (error) throw error
      if (data) {
        onEdit(data[0] as Delivery)
      }
    } catch (error) {
      console.error('Error updating delivery:', error)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Delivery</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="weight" className="text-right">
                Weight (KG)
              </Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="col-span-3"
              />
            </div>
           
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

