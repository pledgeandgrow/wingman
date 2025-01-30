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
import { useTheme } from "next-themes";
import { Sun, Moon } from 'lucide-react';

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
  const { theme, setTheme } = useTheme();

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

  const formatDateTime = (date: string, time: string) => {
    if (!date || !time) return null;
    const [year, month, day] = date.split("-");
    const [hour, minute] = time.split(":");
    return `${year}-${month}-${day}T${hour}:${minute}:00`;
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

      const formattedDepartureTime = formatDateTime(departureDate, departureTime);
      const formattedArrivalTime = formatDateTime(arrivalDate, arrivalTime);

      if (!formattedDepartureTime || !formattedArrivalTime) {
        toast({
          title: "Error",
          description: "Invalid date or time format.",
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
          departure_time: formattedDepartureTime,
          arrival_time: formattedArrivalTime,
          available_weight: availableWeight[0],
        
          description,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your flight has been posted successfully!",
      });
      router.push("/userDashboardGroup/myFlights");
      window.location.reload();
    } catch (error) {
      console.error("Error posting flight:", error);
      toast({
        title: "Error",
        description: "There was an error posting your flight. Please try again.",
        variant: "destructive",
      });
    }
  };
  const [availableHeight, setAvailableHeight] = useState(100); // Default height
  const [availableWidth, setAvailableWidth] = useState(100); // Default width

  return (
    <form onSubmit={handleSubmit} className="rounded-lg max-w-4xl mx-auto p-6 md:p-8">
      <div className="flex justify-center mb-8">
        <h1 className="text-2xl font-bold text-[#00205B] dark:text-[#4A90E2] transition-colors duration-200">
          Post a Flight
        </h1>
      </div>

      <div className="space-y-8 mb-8">
        {/* Flight Number */}
        <div className="flex flex-col">
          <Label htmlFor="flightNumber" className="text-lg font-semibold mb-4 block">
            Flight Number
          </Label>
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
            <Label htmlFor="arrivalAirport" className="text-lg font-semibold mb-4 block">
              Arrival
            </Label>
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
            <Label htmlFor="departureAirport" className="text-lg font-semibold mb-4 block">
              Departure
            </Label>
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

        {/* Departure Date and Time */}
        <div>
          <Label className="text-lg font-semibold mb-4 block text-gray-700 dark:text-gray-300 transition-colors duration-200">
            Departure Date and Time
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="departureDate" className="text-lg font-semibold mb-4 block text-gray-700 dark:text-gray-300 transition-colors duration-200">
                Date
              </Label>
              <Input
                id="departureDate"
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                required
                className="pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200"
              />
            </div>
            <div>
              <Label htmlFor="departureTime" className="text-lg font-semibold mb-4 block text-gray-700 dark:text-gray-300 transition-colors duration-200">
                Time
              </Label>
              <Input
                id="departureTime"
                type="time"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                required
                className="pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <Label className="text-lg font-semibold mb-4 block text-gray-700 dark:text-gray-300 transition-colors duration-200">
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
        <Label htmlFor="availableWeight" className="text-lg font-semibold mb-4 block text-gray-700 dark:text-gray-300 transition-colors duration-200">
          Available Weight (KG)
        </Label>
        <div className="px-2">
          <Slider
            id="availableWeight"
            value={availableWeight}
            onValueChange={setAvailableWeight}
            max={100}
            step={1}
            className="w-full dark:bg-gray-700 transition-colors duration-200"
          />
          <div className="text-right mt-2">{availableWeight[0]} KG</div>
        </div>
      </div>
      {/* ---------------------------------------------------------------------------------------------------------------------- */}
      <div className="grid sm:grid-cols-2 gap-8 mb-8">
        <div>
          <Label className="text-lg font-semibold mb-4 block text-gray-700 dark:text-gray-300 transition-colors duration-200">
            Available Dimensions (cm)
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="arrivalDate" className="text-lg font-semibold mb-4 block text-gray-700 dark:text-gray-300 transition-colors duration-200">Height (cm):</Label>
              <Input
                id="availableHeight"
                type="number"
                placeholder="Enter height"
                value={availableHeight}
                onChange={(e) => setAvailableHeight(Number(e.target.value))}
                required
                className="pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200"
              />
            </div>
            <div>
              <Label htmlFor="arrivalTime" className="text-lg font-semibold mb-4 block text-gray-700 dark:text-gray-300 transition-colors duration-200">Width (cm):</Label>
              <Input
                id="availableWidth"
                type="number"
                placeholder="Enter width"
                value={availableWidth}
                onChange={(e) => setAvailableWidth(Number(e.target.value))}
                required
                className="pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200"
              />
            </div>
          </div>
        </div>

        <div>
          <Label className="text-lg font-semibold mb-4 block text-gray-700 dark:text-gray-300 transition-colors duration-200">
            Arrival Date and Time
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="arrivalDate" className="text-lg font-semibold mb-4 block text-gray-700 dark:text-gray-300 transition-colors duration-200">
                Date
              </Label>
              <Input
                id="arrivalDate"
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                required
                className="pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200"
              />
            </div>
            <div>
              <Label htmlFor="arrivalTime" className="text-lg font-semibold mb-4 block text-gray-700 dark:text-gray-300 transition-colors duration-200">
                Time
              </Label>
              <Input
                id="arrivalTime"
                type="time"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                required
                className="pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <Label htmlFor="description" className="text-lg font-semibold mb-4 block text-gray-700 dark:text-gray-300 transition-colors duration-200">
          Description
        </Label>
        <Textarea
          id="description"
          className="min-h-[100px] dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-200"
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
        <label htmlFor="confirmation" className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
          I confirm that I will deliver the package and that all information provided is accurate.
        </label>
      </div>

      <Button type="submit" className="w-full bg-[#00205B] text-white hover:bg-[#001A4D] dark:bg-[#4A90E2] dark:hover:bg-[#3A80D2] transition-colors duration-200">
        Post Flight
      </Button>
    </form>
  );
}

export default PostFlightPage;

