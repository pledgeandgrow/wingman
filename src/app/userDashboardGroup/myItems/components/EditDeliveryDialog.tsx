import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, FormEvent } from "react"
import supabase from "@/utils/supabase"

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
  item_height: number
  item_width: number
  status: string
  created_at: string
}

interface EditDeliveryProps {
  delivery: Delivery
  onClose: () => void
  onEdit: (updatedDelivery: any) => void
}

export const EditDelivery = ({ delivery, onClose, onEdit }: EditDeliveryProps) => {
  const [editedDelivery, setEditedDelivery] = useState<Delivery>(delivery)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedDelivery(prev => ({ ...prev, [name]: name.includes('item_') ? parseFloat(value) : value }))
  }

  const handleSelectChange = (value: string) => {
    setEditedDelivery(prev => ({ ...prev, status: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase
        .from('deliveries')
        .update({
          item_description: editedDelivery.item_description,
          item_weight: editedDelivery.item_weight,
          item_height: editedDelivery.item_height,
          item_width: editedDelivery.item_width,
          pickup_location: editedDelivery.pickup_location,
          dropoff_location: editedDelivery.dropoff_location,
          status: editedDelivery.status,
          receiver_id: editedDelivery.receiver_id,
        })
        .eq('id', editedDelivery.id)
        .select()

      if (error) throw error

      if (data && data[0]) {
        onEdit(data[0] as Delivery)
      }
      onClose()
      window.location.reload()
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
              <Label htmlFor="item_description" className="text-right">
                Item Description
              </Label>
              <Input
                id="item_description"
                name="item_description"
                value={editedDelivery.item_description}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item_weight" className="text-right">
                Weight (kg)
              </Label>
              <Input
                id="item_weight"
                name="item_weight"
                type="number"
                value={editedDelivery.item_weight}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item_height" className="text-right">
                Height (cm)
              </Label>
              <Input
                id="item_height"
                name="item_height"
                type="number"
                value={editedDelivery.item_height}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item_width" className="text-right">
                Width (cm)
              </Label>
              <Input
                id="item_width"
                name="item_width"
                type="number"
                value={editedDelivery.item_width}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pickup_location" className="text-right">
                Pickup Location
              </Label>
              <Input
                id="pickup_location"
                name="pickup_location"
                value={editedDelivery.pickup_location}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dropoff_location" className="text-right">
                Dropoff Location
              </Label>
              <Input
                id="dropoff_location"
                name="dropoff_location"
                value={editedDelivery.dropoff_location}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                onValueChange={handleSelectChange}
                defaultValue={editedDelivery.status}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="receiver_id" className="text-right">
                Receiver ID
              </Label>
              <Input
                id="receiver_id"
                name="receiver_id"
                value={editedDelivery.receiver_id}
                onChange={handleInputChange}
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

export default EditDelivery;

