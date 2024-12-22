"use client"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import RegisterItemForm from "./components/register-item-form"
import supabase from "@/utils/supabase"
import { useEffect, useState } from "react"

export default function RegisterItem() {
  const[user,setUser]=useState<any>(null)
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        
        setUser(null)
      } else {
        setUser(data.session.user)
      }
    };

    getSession();
  }, []);


 

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <h1 className="text-2xl font-bold text-center mb-8 text-[#00205B] dark:text-white">
        Register an Item
      </h1>
      <RegisterItemForm userId={user?.id} />
    </div>
  )
}

