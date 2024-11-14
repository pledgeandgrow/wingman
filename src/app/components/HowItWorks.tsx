import Image from 'next/image'
import React from 'react'

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
		<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2   rounded-lg  p-4 text-center">
		  <h2 className="text-3xl font-bold mb-2">How does it work</h2>
		  <p className="text-sm text-gray-600">
			Lorem ipsum dolor sit, amet consectetur adipisicing 
		  </p>
		</div>
		<div className="absolute hidden sm:flex sm:flex-col top-1/4 right-24 translate-x-1/2 -translate-y-1/2 w-64 bg-white rounded-lg shadow-lg p-4 text-center">
		  <h2 className="text-xl font-bold mb-2">Plan Your Adventure</h2>
		  <p className="text-sm text-gray-600">
			Craft the perfect itinerary for your dream vacation with our expert tools.
		  </p>
		</div>
		<div className="absolute hidden sm:flex sm:flex-col bottom-48 left-1/2 -translate-x-1/4 translate-y-1/2 w-64 bg-white rounded-lg shadow-lg p-4 text-center">
		  <h2 className="text-xl font-bold mb-2">Create Memories</h2>
		  <p className="text-sm text-gray-600">
			Build lasting memories with friends and family on your travels.
		  </p>
		</div>
		<div className="absolute hidden sm:flex sm:flex-col top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-64 bg-white rounded-lg shadow-lg p-4 text-center">
		  <h2 className="text-xl font-bold mb-2">Discover New Horizons</h2>
		  <p className="text-sm text-gray-600">
			Push your boundaries and find new perspectives in unfamiliar lands.
		  </p>
		</div>
	  </div>
	</div>
  </section>
    )
}

export default HowItWorks