import Image from 'next/image'
import React from 'react'

function HomePageBenefits() {
	const sections = [
		{
		  title: "Innovation at its core",
		  description: "We bring cutting-edge solutions to transform your business landscape.",
		  image: "/assets/images/wing-logo.png",
		},
		{
		  title: "Customer-centric approach",
		  description: "Your success is our priority. We tailor our services to meet your unique needs.",
		  image: "/assets/images/wing-logo.png",
		},
		{
		  title: "Sustainable practices",
		  description: "We're committed to eco-friendly operations that benefit both you and the planet.",
		  image: "/assets/images/wing-logo.png",
		},
		{
		  title: "Expert team",
		  description: "Our professionals bring years of industry experience to every project.",
		  image: "/assets/images/wing-logo.png",
		},
		{
		  title: "Global reach, local touch",
		  description: "We operate worldwide while maintaining a personalized approach for each client.",
		  image: "/assets/images/wing-logo.png",
		},
	  ]
  return (
	<div className="w-full max-w-6xl mx-auto p-4 space-y-8">
      {sections.map((section, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center bg-[#D4AC2C14] rounded-lg p-6 gap-6"
        >
          <div className={`flex items-center gap-4 w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
            <div className="flex-shrink-0 w-10 h-10 bg-[#D4AC2C] rounded-full flex items-center justify-center text-white font-bold text-lg">
              {index + 1}
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">{section.title}</h2>
              <p className="text-gray-600">{section.description}</p>
            </div>
          </div>
          <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
            <Image
              src={section.image}
              alt={`Illustration for ${section.title}`}
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
        </div>
      ))}
      </div>
    )
}

export default HomePageBenefits