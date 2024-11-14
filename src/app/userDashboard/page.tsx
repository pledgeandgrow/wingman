"use client"
import supabase from '@/utils/supabase';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


function Page() {
  const router = useRouter();
  const [userEmail , setUserEmail] =useState(null)

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        router.push('/signIn'); 
      } else {
        setUserEmail(data.session.user.email );
      }
    };

    getSession();
  }, [router]);

  return (
    <div className='p-20'>
      <h1 className='text-4xl'>Welcome back {userEmail}</h1>
    </div>
  );
}

export default Page;
