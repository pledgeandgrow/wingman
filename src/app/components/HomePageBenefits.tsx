import Image from 'next/image'
import React from 'react'

function HomePageBenefits() {
	const sections = [
		{
		  title: "Ease of use",
		  description: "Enjoy a seamless experience with our intuitive interface that's simple for everyone to navigate.",
		  image: "/assets/images/support.png",
		},
		{
		  title: "Tracking",
		  description: "Stay informed in real-time with our advanced tracking system, keeping you updated every step of the way.",
		  image: "/assets/images/tracking.png",
		},
		{
		  title: "Secure Process",
		  description: "Your privacy is our top priority. We utilize cutting-edge security measures to protect your data at all times.",
		  image: "/assets/images/security.png",
		},
		{
		  title: "Affordable prices",
		  description: "Access premium features without the premium price tag. Wingman offers exceptional value for all users.",
		  image: "/assets/images/price.png",
		},
		{
		  title: "24/7 Service",
		  description: "We're here for you around the clock. Our support team is available anytime you need assistance.",
		  image: "/assets/images/service.png",
		},
	  ]
  return (
	<div className="w-full max-w-6xl mx-auto p-4 space-y-8">
		<div className='flex flex-col items-center justify-between gap-4'>
		<h2 className='text-2xl md:text-4xl text-center'> <span className='text-wing-cyan'>Wingman</span> benefits for you</h2>
		<p className='w-[50%] text-center'>Wingman is designed to make your life simpler and more efficient with its suite of user-friendly features and dedicated support.</p>
		</div>
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