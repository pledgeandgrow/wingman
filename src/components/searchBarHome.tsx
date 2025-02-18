"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPinIcon, CalendarIcon, MagnifyingGlassIcon, ArchiveBoxIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

const SearchBar = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Recherchez selon votre besoin</h2>
      
      {/* Barre pour celui qui veut envoyer un colis */}
      <div className="bg-white p-4 rounded-xl shadow-md w-full mb-8 flex items-center gap-4 border border-gray-200">
        <ArchiveBoxIcon className="text-blue-600 w-8 h-8" />
        <Input
          type="text"
          placeholder="Lieu d'expédition"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          className="flex-1 py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 transition"
        />
        <Input
          type="text"
          placeholder="Destination"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
          className="flex-1 py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 transition"
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 transition w-36"
        />
        <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          <MagnifyingGlassIcon className="w-5 h-5" /> Trouver un transporteur
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
