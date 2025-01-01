import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET!, {
  apiVersion: '2023-08-16',
})

// Webhook secret should be set in environment variables
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

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object as Stripe.PaymentIntent
      // Handle the event payment_intent.succeeded
      console.log('PaymentIntent was successful!')
      break
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  // Return a 200 response to acknowledge receipt of the event
  return NextResponse.json({ received: true })
}

// Disable body parsing, as we need the raw body to verify the webhook signature
export const config = {
  api: {
    bodyParser: false,
  },
}

