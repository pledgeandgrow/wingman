import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import supabase from '@/utils/supabase'


const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!



export async function POST(req: Request) {
  const body = await req.text()
  const sig = headers().get('stripe-signature')

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret)
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object as Stripe.PaymentIntent
      console.log('PaymentIntent was successful!')
      
      const flightId = paymentIntentSucceeded.metadata.flightId

      if (flightId) {
        const { data, error } = await supabase
          .from('flights')
          .update({ sender_paid: true })
          .eq('id', flightId)
          .select()

        if (error) {
          console.error('Error updating Supabase:', error)
          return NextResponse.json({ error: 'Error updating database' }, { status: 500 })
        }

        if (data) {
          console.log(`Updated sender_paid status for flight ${flightId}:`, data)
        } else {
          console.log(`No rows updated for flight ${flightId}`)
        }
      } else {
        console.error('Missing flightId in payment intent metadata')
      }
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

export const config = {
  api: {
    bodyParser: false,
  },
}

