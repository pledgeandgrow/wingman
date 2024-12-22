import { useState } from 'react';
import Image from 'next/image';

export default function HeaderSection() {
  const [kg, setKg] = useState(5); // Initial slider value
  const [price, setPrice] = useState(100); // Initial price

  // Function to handle slider value change
  function updateSliderValue(event: React.ChangeEvent<HTMLInputElement>) {
    const newKg = parseInt(event.target.value, 10); // Get new kg value
    setKg(newKg);
    setPrice(newKg * 20); // Update price (example: 1 kg = 20 €)
  }

  return (
    <section className="text-center py-10 px-4 bg-white">
      <h1 className="w-[60%] text-3xl md:text-[70px] font-bold mb-4 leading-[60px] m-auto text-wing-blue">
        Earn money by travelling with Wingman
      </h1>
      <p className="text-lg mb-6">{price} €</p> {/* Display dynamic price */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-4 mt-4">
          <label htmlFor="slider" className="text-black">Kilogram:</label>
          <input
            type="range"
            id="slider"
            min="1"
            max="10"
            value={kg}
            className="w-64 bg-wing-blue"
            onInput={updateSliderValue} // Attach event handler
          />
          <span id="slider-value" className="font-bold text-wing-blue">{kg}.0 KG</span>
        </div>
      </div>
    </section>
  );
}

