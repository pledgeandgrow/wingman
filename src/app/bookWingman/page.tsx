"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import plane from "../assets/plane.png";
import line from "../assets/line.png";
import credit from "../assets/credit.png";
import Netbanking from "../assets/Netbanking.png";
import paylater from "../assets/paylater.png";
import Newpayment from "../assets/Newpayment.png";
import { useState } from "react";
import Link from "next/link";

function page() {

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

 
  const accordionData = [
    {
      title: "Credit / Debit Card",
      description: "Visa, Mastercard, Amex, Rupay, and more",
      imageSrc: credit,
    },
    {
      title: "Paylater",
      description:
        "LazyPay, Simpl, ZestMoney, ICICI PayLater, HDFC Flexipay, and more",
      imageSrc: paylater,
    },
    {
      title: "Net Banking",
      description: "We support all major banks",
      imageSrc: Netbanking,
    },
    {
      title: "Add New Payment Option",
      description: "",
      imageSrc: Newpayment,
    },
  ];

  return (
    <>
      <div className="w-full  mt-2 page-main">
        <div className="w-[90%] m-auto pt-10 pb-20 ps-20 text-white  bg-[#002366] rounded-[50px] pagetop ">
          <h1 className="text-[40px] font-extrabold">Showing Results For</h1>
          <p className="text-[30px]">Find Your Wingman</p>
        </div>

        <div className="w-[80%] m-auto mt-[-40px] bg-[#fff] rounded-xl p-16 shadow-lg page-section-second">
          <div className="w-[100%] flex gap-20">
            <div className="w-[70%]">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold ">NYC</h2>
                  <p className="text-sm ">New York City</p>
                </div>

                <div className="flex-1 flex items-center justify-center mb-4">
                  <div className="relative w-[300px] ">
                    <img
                      src={line.src}
                      alt="Description of the line image"
                      className="w-full absolute top-1/2 left-0"
                      style={{ zIndex: 1 }} 
                    />
                    <img
                      src={plane.src}
                      alt="Description of the plane image"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  -rotate-12"
                      style={{ zIndex: 2 }} 
                    />
                  </div>
                </div>

                <div className="flex-1 text-right">
                  <h2 className="text-3xl font-bold ">London</h2>
                  <p className="text-sm ">Heathrow Airport</p>
                </div>
              </div>
              <div className="flex justify-between mt-10">
                <div>
                  <p className="text-lg font-semibold t">09:00 AM</p>
                  <p className="text-sm ">23 May 2023</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium ">Travel time</p>
                  <div className="w-16 h-px bg-gray-300 my-2"></div>
                  <p className="text-xs ">8 hours</p>
                </div>
                <div>
                  <p className="text-lg font-semibold ">03:00 PM</p>
                  <p className="text-sm ">23 May 2023</p>
                </div>
              </div>

              <div className="py-4 flex items-center justify-between ">
                <div>
                  <p className="text-lg font-semibold t">Flight Number</p>
                  <p className="text-sm ">AB435</p>
                </div>
                <Button
                  className={`${buttonVariants({
                    variant: "outline",
                  })} bg-wing-blue text-white font-bold px-10`}
                >
                  15 Kg
                </Button>
              </div>

              <div className="px-6 py-4 border border-gray-200 rounded-xl shadow-sm">
                <div className=" flex items-center justify-between pb-2">
                  <p className="text-sm font-medium">Wingman Name</p>
                  <p className="text-sm font-medium">Sarah Smith</p>
                </div>
                <div className=" flex items-center justify-between pb-2">
                  <p className="text-sm font-medium">Flight Number</p>
                  <p className="text-sm font-medium">AV235</p>
                </div>
                <div className=" flex items-center justify-between pb-2">
                  <p className="text-sm font-medium">Pick-up Spot</p>
                  <p className="text-sm font-medium">C 13(1st floor)</p>
                </div>
                <div className=" flex items-center justify-between pb-2">
                  <p className="text-sm font-medium">Booking Date</p>
                  <p className="text-sm font-medium">August 28, 2023</p>
                </div>
                <div className=" flex items-center justify-between">
                  <p className="text-sm font-medium">Flight Date</p>
                  <p className="text-sm font-medium">JAN 18, 2024</p>
                </div>
              </div>

              <div className="mt-10">
                <h1>All Payment Options</h1>
                <div className="space-y-5">
                  {accordionData.map((item, index) => (
                    <div
                      key={index}
                      className="w-full p-4 mx-auto bg-white border rounded-xl shadow-md"
                    >
                      <div
                        onClick={() => toggleAccordion(index)}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={item.imageSrc.src}
                            width={40}
                            height={15}
                            alt={`${item.title} icon`}
                          />
                          <div>
                            <h3 className="text-sm font-bold text-gray-800">
                              {item.title}
                            </h3>
                            {item.description && (
                              <p className="text-xs">{item.description}</p>
                            )}
                          </div>
                        </div>
                        <svg
                          className={`w-5 h-5 text-gray-600 transform transition-transform duration-200 ${
                            openIndex === index ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>

                      {openIndex === index && (
                        <div className="mt-4 text-gray-700">
                          <p>
                            This is the content of the accordion. It is only
                            visible when the accordion is open.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-[30%]">
              <div className="">
                <div className="px-6 py-4 border border-gray-200 rounded-xl">
                  <h1 className="py-2 text-lg font-bold">Bill Details</h1>
                  <div className=" flex items-center justify-between pb-2">
                    <p className="text-[12px] font-medium">Amount</p>
                    <p className="text-[12px] font-medium">$400.00</p>
                  </div>
                  <div className=" flex items-center justify-between pb-2">
                    <p className="text-[12px] font-medium">Taxes & Fees</p>
                    <p className="text-[12px] font-medium">$20.00</p>
                  </div>
                  <div className=" flex items-center justify-between pb-2">
                    <p className="py-2 text-lg font-bold">Total Charges</p>
                    <p className="py-2 text-lg font-bold text-wing-blue ">
                      $420.00
                    </p>
                  </div>
                </div>
              </div>

              <Link href='/'
                  className={`${buttonVariants({
                    variant: "outline",
                  })} bg-wing-blue text-white font-bold py-5 mt-20  w-full`}
                >
                  Next
                </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
