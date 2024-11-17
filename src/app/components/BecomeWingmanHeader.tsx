// components/HeaderSection.js
import Image from 'next/image';


export default function HeaderSection() {
  return (
    <section className="text-center py-10 px-4 bg-white">
      <h1 className="w-[60%] text-3xl md:text-[70px] font-bold mb-4 leading-[60px] m-auto text-wing-blue">
        Your accommodation could earn you money on Airbnb
      </h1>
      <p className="text-lg mb-6">1 kg - 10$</p>
      <div className="flex flex-col items-center">
        
        <div className="flex items-center gap-4 mt-4">
          <label htmlFor="slider" className="text-black">Kilogram:</label>
          <input type="range" id="slider" min="1" max="10" defaultValue="5" className="w-64 bg-wing-blue" onInput={updateSliderValue} />
          <span id="slider-value" className="font-bold text-wing-blue">5.0 $</span>
        </div>
      </div>
    </section>
  );

  function updateSliderValue(event: React.ChangeEvent<HTMLInputElement>) {
    const sliderValue = document.getElementById('slider-value');
    if (sliderValue) {
      sliderValue.textContent = `${event.target.value}.0 $`;
    }
  }
}
