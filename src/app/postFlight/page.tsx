"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Plane } from 'lucide-react';
import { Input } from "@/components/ui/input";
import Link from "next/link";
import supabase from "@/utils/supabase";
import { useToast } from "@/hooks/use-toast";

function PostFlightPage() {
  const [flightNumber, setFlightNumber] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [availableWeight, setAvailableWeight] = useState([34]);
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const tags = [
    "Clothes and Textile",
    "Tools",
    "Glass",
    "Airbag",
    "Fragile",
    "Paperwork",
    "Medicine",
    "Luxury",
    "Electronics",
    "Art",
    "Other",
    "Food and beverages",
    "Healthcare",
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConfirmed) {
      toast({
        title: "Error",
        description: "Please confirm that you will deliver the package.",
        variant: "destructive",
      });
      return;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to post a flight.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.from("flights").insert([
        {
          wingman_id: user.id,
          flight_number: flightNumber,
          departure_airport: departureAirport,
          arrival_airport: arrivalAirport,
          departure_time: `${departureDate}T${departureTime}`,
          arrival_time: `${arrivalDate}T${arrivalTime}`,
          available_weight: availableWeight[0],
          description,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your flight has been posted successfully!",
      });
      router.push("/myFlights");
    } catch (error) {
      return
    }
  };
  const [availableHeight, setAvailableHeight] = useState(100); // Default height
const [availableWidth, setAvailableWidth] = useState(100); // Default width


  return (
    
    <form onSubmit={handleSubmit} className="rounded-lg max-w-4xl mx-auto p-6 md:p-8">
      <div className="flex justify-center mb-8">
        <h1 className="text-2xl font-bold text-[#00205B]">Post a Flight</h1>
      </div>

      <div className="space-y-8 mb-8">
  {/* Flight Number */}
  <div className="flex flex-col">
    <Label htmlFor="flightNumber" className="text-lg font-semibold mb-4 block">Flight Number</Label>
    <div className="relative">
      <Plane className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
      <Input
        id="flightNumber"
        className="pl-10"
        placeholder="Enter flight number"
        value={flightNumber}
        onChange={(e) => setFlightNumber(e.target.value)}
        required
      />
    </div>
  </div>

  {/* Departure and Arrival */}
  <div className="grid sm:grid-cols-2 gap-8">
    {/* Arrival */}
    <div>
      <Label htmlFor="arrivalAirport" className="text-lg font-semibold mb-4 block">Arrival</Label>
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input
          id="arrivalAirport"
          className="pl-10"
          placeholder="Arrival airport"
          value={arrivalAirport}
          onChange={(e) => setArrivalAirport(e.target.value)}
          required
        />
      </div>
    </div>

    {/* Departure */}
    <div>
      <Label htmlFor="departureAirport" className="text-lg font-semibold mb-4 block">Departure</Label>
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input
          id="departureAirport"
          className="pl-10"
          placeholder="Departure airport"
          value={departureAirport}
          onChange={(e) => setDepartureAirport(e.target.value)}
          required
        />
      </div>
    </div>
  </div>
</div>


      <div className="mb-8">
        <Label className="text-lg font-semibold mb-4 block">
          Package Preferences
        </Label>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {tags.map((tag) => (
            <Button
            key={tag}
            type="button"
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className={`rounded-full text-sm ${
              selectedTags.includes(tag) ? "bg-[#00205B] text-white" : ""
            }`}
            onClick={() => toggleTag(tag)}
          >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <Label htmlFor="availableWeight" className="text-lg font-semibold mb-4 block">
          Available Weight (KG)
        </Label>
        <div className="px-2">
          <Slider
            id="availableWeight"
            value={availableWeight}
            onValueChange={setAvailableWeight}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="text-right mt-2">{availableWeight[0]} KG</div>
        </div>
      </div>
{/* ---------------------------------------------------------------------------------------------------------------------- */}
      <div className="grid sm:grid-cols-2 gap-8 mb-8">
      

<div>
          <Label className="text-lg font-semibold mb-4 block">
           Available Dimensions (cm)
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="arrivalDate">Height (cm):</Label>
              <Input
          id="availableHeight"
          type="number"
          placeholder="Enter height"
          value={availableHeight}
          onChange={(e) => setAvailableHeight(Number(e.target.value))}
          required
        />
            </div>
            <div>
              <Label htmlFor="arrivalTime">Width (cm):</Label>
              <Input
          id="availableWidth"
          type="number"
          placeholder="Enter width"
          value={availableWidth}
          onChange={(e) => setAvailableWidth(Number(e.target.value))}
          required
        />
            </div>
          </div>
        </div>


        <div>
          <Label className="text-lg font-semibold mb-4 block">
            Arrival Date and Time
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="arrivalDate">Date</Label>
              <Input
                id="arrivalDate"
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="arrivalTime">Time</Label>
              <Input
                id="arrivalTime"
                type="time"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <Label htmlFor="description" className="text-lg font-semibold mb-4 block">Description</Label>
        <Textarea
          id="description"
          className="min-h-[100px]"
          placeholder="Enter any additional information about your flight or package preferences"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-8 flex items-start gap-2">
        <Checkbox
          id="confirmation"
          className="mt-1"
          checked={isConfirmed}
          onCheckedChange={(checked) => setIsConfirmed(checked as boolean)}
        />
        <label htmlFor="confirmation" className="text-sm text-gray-600">
          I confirm that I will deliver the package and that all information provided is accurate.
        </label>
      </div>

      <Button type="submit" className="w-full bg-[#00205B] text-white">
        Post Flight
      </Button>
    </form>
  );
}

export default PostFlightPage;

