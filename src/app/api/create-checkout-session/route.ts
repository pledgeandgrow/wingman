import { stripe } from '@/lib/stripe'
import supabase from '@/utils/supabase'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

async function getCustomerIdFromSupabase(userId: string): Promise<string | undefined> {
  const { data, error } = await supabase
    .from('users')
    .select('stripe_customer_id')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching Stripe customer ID from Supabase:', error)
    return undefined
  }

  return data?.stripe_customer_id
}

async function updateCustomerIdInSupabase(userId: string, stripeCustomerId: string): Promise<void> {
  const { error } = await supabase
    .from('users')
    .update({ stripe_customer_id: stripeCustomerId })
    .eq('id', userId)

  if (error) {
    console.error('Error updating Stripe customer ID in Supabase:', error)
    throw error
  }
}

export async function POST(req: Request) {
  try {
    const { flightId, userId, email } = await req.json()

    if (!flightId || !userId || !email) {
      return NextResponse.json({ error: 'Flight ID, User ID, and email are required' }, { status: 400 })
    }

    // Fetch the user's Stripe customer ID
    let stripeCustomerId: string | undefined = await getCustomerIdFromSupabase(userId)
    let customer: Stripe.Customer | Stripe.DeletedCustomer | null = null

    // Check if the customer exists in Stripe
    if (stripeCustomerId) {
      try {
        customer = await stripe.customers.retrieve(stripeCustomerId)
        if ((customer as Stripe.DeletedCustomer).deleted) {
          customer = null
          stripeCustomerId = undefined
        }
      } catch (error) {
        console.error('Error retrieving Stripe customer:', error)
        customer = null
        stripeCustomerId = undefined
      }
    }

    // If customer doesn't exist or was deleted, create a new one
    if (!customer) {
      try {
        customer = await stripe.customers.create({
          email: email,
          metadata: { supabase_user_id: userId },
        })
        stripeCustomerId = customer.id

        // Update Supabase with the new customer ID
        await updateCustomerIdInSupabase(userId, stripeCustomerId)
      } catch (error) {
        console.error('Error creating Stripe customer:', error)
        return NextResponse.json({ error: 'Error creating Stripe customer' }, { status: 500 })
      }
    }

    // Fetch flight details from Supabase
    const { data: flightData, error: flightError } = await supabase
      .from('flights')
      .select('departure_airport, arrival_airport')
      .eq('id', flightId)
      .single()

    if (flightError || !flightData) {
      console.error('Error fetching flight details:', flightError)
      return NextResponse.json({ error: 'Error fetching flight details' }, { status: 500 })
    }

    // Create a checkout session for payment
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer: stripeCustomerId,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Wingman Flight',
              description: `Flight from ${flightData.departure_airport} to ${flightData.arrival_airport}`,
            },
            unit_amount: 1000
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        metadata: {
          flightId: flightId,
          userId: userId,
        },
      },
      metadata: {
        flightId: flightId,
        userId: userId,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    })

    return NextResponse.json({
      sessionId: session.id,
      paymentIntentId: session.payment_intent as string,
    })
  } catch (err) {
    console.error('Error creating checkout session:', err)
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 })
  }
}

