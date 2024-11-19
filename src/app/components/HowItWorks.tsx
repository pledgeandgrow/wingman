import Image from 'next/image';
import React from 'react';

function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="relative w-full max-w-4xl mx-auto mt-6 aspect-square">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-1/2 h-1/2">
              <Image
                src="/assets/images/section/plane.png"
                alt="Earth"
                layout="fill"
                className="rounded-full"
              />
            </div>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg p-4 text-center">
            <h2 className="text-3xl font-bold mb-2">How does it work</h2>
            <p className="text-sm text-gray-600">
              Send items or goods to your loved ones and family through a circular model and an efficient method.
            </p>
          </div>
          <div className="absolute hidden sm:flex sm:flex-col top-1/4 right-24 translate-x-1/2 -translate-y-1/2 w-80 bg-white rounded-lg shadow-lg p-4 text-center">
            <div className="absolute top-0 left-0 bg-gray-800 text-white rounded-full h-8 w-8 flex items-center justify-center -translate-x-4 -translate-y-4">
              2
            </div>
            <h2 className="text-xl font-bold mb-2">Choose your wingman</h2>
            <p className="text-sm text-gray-600">
              According to your details, you will see different flights in which you can select the available space needed.
            </p>
          </div>
          <div className="absolute hidden sm:flex sm:flex-col top-1/2 right-24 translate-x-1/2 -translate-y-1/2 w-80 bg-white rounded-lg shadow-lg p-4 text-center">
            <div className="absolute top-0 left-0 bg-gray-800 text-white rounded-full h-8 w-8 flex items-center justify-center -translate-x-4 -translate-y-4">
              4
            </div>
            <h2 className="text-xl font-bold mb-2">Track your item</h2>
            <p className="text-sm text-gray-600">
              Stay updated every step of the way! Wingman offers live tracking so you can monitor your item’s journey as it
              travels with your selected Wingman.
            </p>
          </div>
          <div className="absolute hidden sm:flex sm:flex-col top-[200px] left-0 -translate-y-1/3 w-80 bg-white rounded-lg shadow-lg p-4 text-center">
            <div className="absolute top-0 left-0 bg-gray-800 text-white rounded-full h-8 w-8 flex items-center justify-center -translate-x-4 -translate-y-4">
              1
            </div>
            <h2 className="text-xl font-bold mb-2">Post your item</h2>
            <p className="text-sm text-gray-600">
              Create a new delivery request by entering the item details, pick-up and drop-off locations, and any specific
              requirements. Wingman will connect you with available travelers heading to your destination.
            </p>
          </div>
          <div className="absolute hidden sm:flex sm:flex-col bottom-48 left-1/2 -translate-x-1/4 translate-y-1/2 w-80 bg-white rounded-lg shadow-lg p-4 text-center">
            <div className="absolute top-0 left-0 bg-gray-800 text-white rounded-full h-8 w-8 flex items-center justify-center -translate-x-4 -translate-y-4">
              5
            </div>
            <h2 className="text-xl font-bold mb-2">Confirm Delivery</h2>
            <p className="text-sm text-gray-600">
              Once your item reaches the receiver, confirm its arrival in the app and rate your Wingman. This feedback helps
              build trust within the community for future deliveries.
            </p>
          </div>
          <div className="absolute hidden sm:flex sm:flex-col top-[60%] left-40 -translate-x-1/2 -translate-y-1/2 w-80 bg-white rounded-lg shadow-lg p-4 text-center">
            <div className="absolute top-0 left-0 bg-gray-800 text-white rounded-full h-8 w-8 flex items-center justify-center -translate-x-4 -translate-y-4">
              3
            </div>
            <h2 className="text-xl font-bold mb-2">Arrange the Meet-Up</h2>
            <p className="text-sm text-gray-600">
              Push your boundaries and find new perspectives in unfamiliar lands.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
