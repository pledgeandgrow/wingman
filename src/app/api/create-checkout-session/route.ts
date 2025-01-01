import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET!, {
  apiVersion: '2023-08-16',
})

export async function POST(req: Request) {
  try {
    const flightId = await req.text()

    if (!flightId) {
      return NextResponse.json({ error: 'Flight ID is required' }, { status: 400 })
    }

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
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        flightId: flightId,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (err) {
    console.error('Error creating checkout session:', err)
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 })
  }
}

