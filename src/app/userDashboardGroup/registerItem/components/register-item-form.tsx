"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { BaggageClaim, MapPin, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import supabase from "@/utils/supabase"
import { useToast } from "@/hooks/use-toast"

interface Receiver {
  id: string
  name: string
}

interface RegisterItemFormProps {
  userId: string
}

export default function RegisterItemForm({ userId }: RegisterItemFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [weight, setWeight] = useState([10])
  const [height, setHeight] = useState([10])
  const [width, setWidth] = useState([10])
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [receivers, setReceivers] = useState<Receiver[]>([])
  const [selectedReceiver, setSelectedReceiver] = useState<string>("")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const getReceivers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id, name')
        .eq('role', 'receiver')

      if (error) {
        console.error('Error fetching receivers:', error)
        toast({
          title: "Error",
          description: "Failed to load receivers. Please try again.",
          variant: "destructive",
        })
      } else {
        setReceivers(data as Receiver[])
      }
    }

    getReceivers()
  }, [toast])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      
      const { error } = await supabase
        .from('deliveries')
        .insert({
          sender_id: userId,
          receiver_id: selectedReceiver,
          pickup_location: formData.get('pickup_location'),
          dropoff_location: formData.get('dropoff_location'),
          item_description: formData.get('description'),
          item_weight: weight[0],
          item_height: height[0],
          item_width: width[0],
          status: 'pending'
        })

      if (error) throw error

      toast({
        title: "Success",
        description: "Your item has been registered successfully.",
      })

      router.push('/userDashboardGroup/myItems')
      window.location.reload()
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid sm:grid-cols-2 gap-8">
        <div className="space-y-2">
          <Label htmlFor="description" className="text-lg font-semibold">
            Item Description
          </Label>
          <div className="relative">
            <BaggageClaim className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              id="description"
              name="description"
              className="pl-10"
              placeholder="Enter item description"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="receiver_id" className="text-lg font-semibold">
            Receiver
          </Label>
          <Select onValueChange={setSelectedReceiver} value={selectedReceiver}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a receiver" />
            </SelectTrigger>
            <SelectContent>
              {receivers.map((receiver) => (
                <SelectItem key={receiver.id} value={receiver.id}>
                  {receiver.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-8">
        <div className="space-y-2">
          <Label htmlFor="pickup_location" className="text-lg font-semibold">
            Pickup Location
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              id="pickup_location"
              name="pickup_location"
              className="pl-10"
              placeholder="Enter pickup location"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dropoff_location" className="text-lg font-semibold">
            Dropoff Location
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              id="dropoff_location"
              name="dropoff_location"
              className="pl-10"
              placeholder="Enter dropoff location"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="weight" className="text-lg font-semibold">
          Item Weight (KG)
        </Label>
        <div className="px-2">
          <Slider
            id="weight"
            name="weight"
            value={weight}
            onValueChange={setWeight}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="text-right mt-2">{weight[0]} KG</div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="height" className="text-lg font-semibold">
          Item Height (CM)
        </Label>
        <div className="px-2">
          <Slider
            id="height"
            name="height"
            value={height}
            onValueChange={setHeight}
            max={300}
            step={1}
            className="w-full"
          />
          <div className="text-right mt-2">{height[0]} CM</div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="width" className="text-lg font-semibold">
          Item Width (CM)
        </Label>
        <div className="px-2">
          <Slider
            id="width"
            name="width"
            value={width}
            onValueChange={setWidth}
            max={300}
            step={1}
            className="w-full"
          />
          <div className="text-right mt-2">{width[0]} CM</div>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <Checkbox
          id="confirmation"
          checked={isConfirmed}
          onCheckedChange={(checked) => setIsConfirmed(checked as boolean)}
          className="mt-1"
        />
        <label htmlFor="confirmation" className="text-sm text-gray-600 dark:text-gray-400">
          I confirm that all the information provided is accurate.
        </label>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#00205B] text-white hover:bg-[#001A4D] dark:bg-[#4A90E2] dark:hover:bg-[#3A80D2]"
        disabled={!isConfirmed || isLoading || !selectedReceiver}
      >
        {isLoading ? "Registering..." : "Register Item"}
      </Button>
    </form>
  )
}

