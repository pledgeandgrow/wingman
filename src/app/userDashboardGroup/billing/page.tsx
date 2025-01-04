"use client"

import React from 'react'
import { UserInvoices } from './components/UserInvoices'
import { useSupabaseUser } from '@/app/hooks/getSession'

function InvoicesPage() {
  const { user, loading } = useSupabaseUser()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Please sign in to view your invoices.</div>
  }

  return (
    <div>
      {user.stripe_customer_id ? (
        <UserInvoices customerId={user.stripe_customer_id} />
      ) : (
        <div>No Stripe customer ID found. Please complete your profile setup.</div>
      )}
    </div>
  )
}

export default InvoicesPage

