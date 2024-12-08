"use client"
import React, { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'

function page() {
	const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [kilograms, setKilograms] = useState([34])

  const tags = [
    'Clothes and Textile',
    'Tools',
    'Glass',
    'Airbag',
    'Fragile',
    'Paperwork',
    'Medicine',
    'Luxury',
    'Electronics',
    'Art',
    'Other',
    'Food and beverages',
    'Healthcare'
  ]

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }
  return (
	  <div className=" rounded-lg max-w-4xl mx-auto p-6  md:p-8">
        <div className="flex justify-center mb-8">
          <Button className="bg-[#00205B] text-white px-8">Post a flight</Button>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          <div>
            <Label className="text-lg font-semibold mb-4 block">Departure</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input className="pl-10" placeholder="Departure airport" />
            </div>
          </div>
          <div>
            <Label className="text-lg font-semibold mb-4 block">Arrival</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input className="pl-10" placeholder="Arrival airport" />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <Label className="text-lg font-semibold mb-4 block">Package Preferences</Label>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {tags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`rounded-full text-sm ${
                  tag === 'Clothes and Textile' ? 'bg-[#00205B] text-white' : ''
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <Label className="text-lg font-semibold mb-4 block">Available Kilograms</Label>
          <div className="px-2">
            <Slider
              value={kilograms}
              onValueChange={setKilograms}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="text-right mt-2">{kilograms[0]} KG</div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          <div>
            <Label className="text-lg font-semibold mb-4 block">Time availability</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Departure time</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="number" placeholder="08" />
                  <Input type="number" placeholder="30" />
                </div>
              </div>
              <div>
                <Label>Arrival time</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="number" placeholder="13" />
                  <Input type="number" placeholder="30" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <Label className="text-lg font-semibold mb-4 block">Date Availability</Label>
            <div className=" flex justify-center items-center gap-4">
				from
              <Input type="date" className="" />
			  to
              <Input type="date" />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          <div>
            <Label className="text-lg font-semibold mb-4 block">Height Limit</Label>
            <Input type="number" placeholder="Enter height limit" />
          </div>
          <div>
            <Label className="text-lg font-semibold mb-4 block">Width Limit</Label>
            <Input type="number" placeholder="Enter width limit" />
          </div>
        </div>

        <div className="mb-8">
          <Label className="text-lg font-semibold mb-4 block">Description</Label>
          <Textarea className="min-h-[100px]" placeholder="Enter description" />
        </div>

        <div className="mb-8 flex items-start gap-2">
          <Checkbox id="confirmation" className="mt-1" />
          <label htmlFor="confirmation" className="text-sm text-gray-600">
            I confirm that I will deliver the package.
          </label>
        </div>

        <Button className="w-full bg-[#00205B] text-white">Next Page</Button>
      </div>
  )
}

export default page