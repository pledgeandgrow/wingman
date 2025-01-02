"use client";

import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Hero from "./components/hero/Hero";
import HowItWorks from "./components/HowItWorks";
import HomePageBenefits from "./components/HomePageBenefits";
import HomeNewsLetter from "./components/HomeNewsLetter";




export default function Home() {
 
  

  return (
    <div >
     <Hero/>
     <HowItWorks/>
     <HomeNewsLetter/>
      
    <HomePageBenefits/>

      
      
    </div>
  );
}
