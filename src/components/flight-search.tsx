"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPinIcon, CalendarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Simuler une recherche dynamique
  const handleSearch = (query: string, type: "departure" | "arrival") => {
    if (query.length > 2) {
      // Simulation d'une liste de villes (Remplacer par API réelle)
      const cities = ["Paris", "Lyon", "Marseille", "Bordeaux", "Nice", "Toulouse"];
      setSuggestions(cities.filter(city => city.toLowerCase().includes(query.toLowerCase())));
    } else {
      setSuggestions([]);
    }

    type === "departure" ? setDeparture(query) : setArrival(query);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-4xl mx-auto flex items-center gap-3 border border-gray-200">
      <div className="relative flex-1 group">
        <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />
        <Input
          type="text"
          placeholder="Départ"
          value={departure}
          onChange={(e) => handleSearch(e.target.value, "departure")}
          className="pl-12 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 w-full transition-all group-hover:bg-gray-200"
        />
      </div>
      
      <div className="relative flex-1 group">
        <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />
        <Input
          type="text"
          placeholder="Arrivée"
          value={arrival}
          onChange={(e) => handleSearch(e.target.value, "arrival")}
          className="pl-12 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 w-full transition-all group-hover:bg-gray-200"
        />
      </div>
      
      <div className="relative flex-1 group">
        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="pl-12 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 w-full transition-all group-hover:bg-gray-200"
        />
      </div>
      
      <Button className="bg-blue-600 text-white px-6 py-3 text-lg rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2">
        <MagnifyingGlassIcon className="w-6 h-6" /> Rechercher
      </Button>
    </div>
  );
};

export default SearchBar;
