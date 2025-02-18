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
import BecomeWingmanHeader from '../components/BecomeWingmanHeader'
import BecomeWingmanListingSection from '../components/BecomeWingmanListing'
import BecomeWingmanCohost from '../components/BecomeWingmanCohost'
import BecomeWingmanFaq from '../components/BecomeWingmanFaq'
import WeightSelector from "../components/WeightSelector";
import HowItWorks from "../components/HowItWorks";
function page() {


 
  

  return (
    <>
      <BecomeWingmanHeader />
      <WeightSelector />
      <BecomeWingmanListingSection/>
      <HowItWorks/>
      <BecomeWingmanCohost/>
      <BecomeWingmanFaq  />

    </>
  );
}

export default page;
