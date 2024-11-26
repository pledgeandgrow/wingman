"use client"

import { RefreshCcw, Smartphone, HeadphonesIcon } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

export default function ESIMPage() {
  const features = [
    {
      icon: RefreshCcw,
      title: "Flexible Cancellation",
      description: "Enjoy the flexibility to be refunded at any time before you install the eSIM or pick up the SIM card"
    },
    {
      icon: Smartphone,
      title: "Convenient and Efficient",
      description: "No delivery required. Install your eSIM online or pick up your SIM card at the airport counter"
    },
    {
      icon: HeadphonesIcon,
      title: "Customer Support",
      description: "One-on-one customer service will help you with all installation and usage issues"
    }
  ]

  const activationSteps = [
    {
      image: "https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Purchase eSIM",
      description: "Choose your destination and data plan"
    },
    {
      image: "https://images.pexels.com/photos/1051077/pexels-photo-1051077.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Get QR Code",
      description: "Receive your eSIM QR code via email"
    },
    {
      image: "https://images.pexels.com/photos/119777/pexels-photo-119777.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Scan & Install",
      description: "Scan the QR code with your phone camera"
    },
    {
      image: "https://images.pexels.com/photos/885880/pexels-photo-885880.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Start Using",
      description: "Activate your eSIM when you arrive at your destination"
    }
  ]

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
                eSIM&SIM
                <br />
                Global Travel
                <br />
                Communication Partner
              </h1>
              <p className="text-xl text-blue-100">
                Stay connected anytime, anywhere
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative h-64 w-64 overflow-hidden rounded-full bg-blue-500 sm:h-72 sm:w-72 lg:h-96 lg:w-96">
                <img
                  src="/assets/images/wing-logo.png"
                  alt="People using phones"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 max-w-5xl mx-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Why Book eSIM and SIM with Trip.com?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-blue-50 p-3">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16 max-w-5xl mx-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Activate your eSIM Before Departure
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {activationSteps.map((step, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="mb-4 aspect-square overflow-hidden rounded-lg">
                    <img src={step.image} alt={step.title} className="h-full w-full object-cover" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

