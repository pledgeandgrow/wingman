import supabase from '@/utils/supabase'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET!)

export async function POST(req: Request) {
  try {
    const { flightId, userId, email } = await req.json()
    
    if (!flightId || !userId || !email) {
      return NextResponse.json({ error: 'Flight ID, User ID, and email are required' }, { status: 400 })
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single()

    if (userError) {
      console.error('Error fetching user data:', userError)
      return NextResponse.json({ error: 'Error fetching user data' }, { status: 500 })
    }

    let stripeCustomerId = userData?.stripe_customer_id

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: email,
        metadata: { supabase_user_id: userId },
      })
      stripeCustomerId = customer.id

      const { error: updateError } = await supabase
        .from('users')
        .update({ stripe_customer_id: stripeCustomerId })
        .eq('id', userId)

      if (updateError) {
        console.error('Error updating user with Stripe customer ID:', updateError)
        return NextResponse.json({ error: 'Error updating user data' }, { status: 500 })
      }
    }

    // Create an invoice item
    const invoiceItem = await stripe.invoiceItems.create({
      customer: stripeCustomerId,
      amount: 2000, // $20.00
      currency: 'usd',
      description: `Wingman Flight ${flightId}`,
    })

    // Create and finalize the invoice
    const invoice = await stripe.invoices.create({
      customer: stripeCustomerId,
      auto_advance: true, // automatically finalize and send the invoice
      collection_method: 'charge_automatically',
      metadata: {
        flightId: flightId,
        userId: userId,
      }
    })

    // Finalize the invoice
    await stripe.invoices.finalizeInvoice(invoice.id)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Wingman Flight',
              description: `Payment for flight ${flightId}`,
            },
            unit_amount: 2000, 
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer: stripeCustomerId,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        flightId: flightId,
        userId: userId,
        invoiceId: invoice.id // Add invoice ID to metadata
      },
    })

    return NextResponse.json({ 
      sessionId: session.id,
      invoiceId: invoice.id // Return invoice ID as well
    })
  } catch (err) {
    console.error('Error creating checkout session:', err)
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 })
  }
}