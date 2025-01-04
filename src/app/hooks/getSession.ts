"use client"

import { useState, useEffect } from 'react'
import type { User } from '@supabase/supabase-js'
import supabase from '@/utils/supabase'

export interface ExtendedUser extends User {
  stripe_customer_id?: string
}

export function useSupabaseUser() {
  const [user, setUser] = useState<ExtendedUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
        if (authError) throw authError

        if (authUser) {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('stripe_customer_id')
            .eq('id', authUser.id)
            .single()

          if (userError) throw userError

          setUser({ ...authUser, stripe_customer_id: userData?.stripe_customer_id })
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('stripe_customer_id')
          .eq('id', session.user.id)
          .single()

        if (userError) {
          console.error('Error fetching user data:', userError)
          setUser(session.user)
        } else {
          setUser({ ...session.user, stripe_customer_id: userData?.stripe_customer_id })
        }
      } else {
        setUser(null)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  return { user, loading }
}

