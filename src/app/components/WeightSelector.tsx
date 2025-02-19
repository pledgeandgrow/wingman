import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function WeightSelector() {
  const [kg, setKg] = useState(5);
  const [price, setPrice] = useState(100);
  const [animatedPrice, setAnimatedPrice] = useState(price);

  function updateSliderValue(event: React.ChangeEvent<HTMLInputElement>) {
    const newKg = parseInt(event.target.value, 10);
    setKg(newKg);
    setPrice(newKg * 20);
  }

  // Animation fluide du prix
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedPrice((prev) => {
        if (prev < price) return prev + 2;
        if (prev > price) return prev - 2;
        return price;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [price]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-8 bg-gray-100 p-6 rounded-lg shadow-lg">
      {/* Sélecteur de poids */}
      <div className="flex flex-col items-center">
        <p className="text-2xl font-bold text-gray-900">Transportez & Gagnez</p>
        <div className="flex items-center gap-4 mt-4">
          <label htmlFor="slider" className="text-lg font-medium text-gray-700">
            Kilogram:
          </label>
          <input
            type="range"
            id="slider"
            min="1"
            max="10"
            value={kg}
            className="w-64 accent-wing-blue transition-all duration-300"
            onChange={updateSliderValue}
          />
          <span className="font-bold text-wing-blue text-xl">{kg} KG</span>
        </div>
        {/* Prix animé */}
        <motion.p
          className="text-xl font-semibold text-green-600 mt-3"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5 }}
        >
          {animatedPrice} €
        </motion.p>
      </div>

      {/* Image d'avion animée */}
      <motion.div 
        className="relative w-48 h-48"
        animate={{ y: -kg * 5 }} // L’avion monte en fonction du poids
        transition={{ type: "spring", stiffness: 50 }}
      >
        <Image
          src="/assets/images/vecteezy_white-jet-plane-isolated_55802541.png"
          alt="Avion en vol"
          width={180}
          height={180}
          className="drop-shadow-lg"
        />
      </motion.div>
    </div>
  );
}
