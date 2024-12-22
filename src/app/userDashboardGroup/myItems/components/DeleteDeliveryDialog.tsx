"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import supabase from '@/utils/supabase'

interface Delivery {
  id: string
  item_description: string
}

interface DeleteDeliveryDialogProps {
  delivery: Delivery
  onClose: () => void
  onDelete: (deletedDeliveryId: string) => void
}

export function DeleteDeliveryDialog({ delivery, onClose, onDelete }: DeleteDeliveryDialogProps) {
  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('deliveries')
        .delete()
        .eq('id', delivery.id)

      if (error) throw error
      onDelete(delivery.id)
    } catch (error) {
      console.error('Error deleting delivery:', error)
    }
  }

  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the delivery
            "{delivery.item_description}" and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

