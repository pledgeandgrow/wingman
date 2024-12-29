"use client";

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Clickboard from "../assets/clipboard-tick.png";

export default function SignatureTabs() {
 

  return (
    <>
      <div className="w-full mt-2 page-main">
        <div className="w-[90%] m-auto pt-10 pb-20 ps-20 text-white bg-[#002366] rounded-[50px] pagetop">
          <h1 className="text-[40px] font-extrabold">Payment Successful!</h1>
          <p className="text-[30px]">You have successfully</p>
        </div>

        <div className="w-[80%] m-auto mt-[-40px] bg-[#fff] rounded-xl p-16 shadow-lg page-section-second">
          <div className="w-[80%] m-auto  bg-white p-6 rounded-lg">
            <div className="flex justify-center items-center flex-col gap-5">
            <div className="w-[250px]">
            <img
                      src={Clickboard.src}
                      alt="Description of the plane image"
                      className=""
                      style={{ zIndex: 2 }} 
                    />
            </div>
            <h3 className='text-3xl font-bold'>Payment Successful!</h3>
            <p className='text-xl '>You have successfully booked your Car.</p>
            <p className='text-xl '>You will receive a resume by mail of the detail of the contract</p>
            </div>
         
          </div>
        </div>
      </div>
    </>
  );
}