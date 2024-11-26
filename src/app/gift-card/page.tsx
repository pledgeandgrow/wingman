"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ClipboardList, Gift, Building2 } from 'lucide-react'
import { useState } from "react"

export default function GiftCards() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const popularDesigns = [
    {
      title: "Beach Getaway",
      image: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Beach themed gift card"
    },
    {
      title: "City Adventure",
      image: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "City themed gift card"
    },
    {
      title: "Mountain Escape",
      image: "https://images.pexels.com/photos/1666012/pexels-photo-1666012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Mountain themed gift card"
    },
    {
      title: "Culinary Delights",
      image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Food themed gift card"
    }
  ]

  const whatsNew = [
    {
      title: "Gift Card Terms & Conditions",
      image: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Terms and conditions illustration"
    },
    {
      title: "Special Sales",
      image: "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Special sale promotion"
    },
    {
      title: "How to Use Gift Cards",
      image: "https://images.pexels.com/photos/5650033/pexels-photo-5650033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Gift card usage guide"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % whatsNew.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + whatsNew.length) % whatsNew.length)
  }

  return (
    <div className="min-h-screen p-3">
      <div className="relative bg-[url('https://images.pexels.com/photos/6707631/pexels-photo-6707631.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center py-20">
        <div className="absolute inset-0 bg-blue-900/50 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-4">Gift Cards</h1>
          <p className="text-xl text-white">Give the gift of unforgettable experiences</p>
        </div>
      </div>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Popular Designs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDesigns.map((design, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src={design.image}
                  alt={design.alt}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{design.title}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2"
          >
            <ClipboardList className="h-6 w-6" />
            <span>My Bookings</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2"
          >
            <Gift className="h-6 w-6" />
            <span>My Gift Cards</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2"
          >
            <Building2 className="h-6 w-6" />
            <span>Purchase as a Company</span>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">What's New</h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {whatsNew.map((item, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Card className="mx-2">
                    <CardContent className="p-0">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Holidays</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <Image
                src="https://images.pexels.com/photos/1656564/pexels-photo-1656564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Christmas themed gift card"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">Christmas</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <Image
                src="https://images.pexels.com/photos/5591243/pexels-photo-5591243.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Thanksgiving themed gift card"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">Thanksgiving</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <Image
                src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="New Year themed gift card"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">New Year</h3>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

