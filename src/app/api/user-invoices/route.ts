import { stripe } from "@/lib/stripe";


export async function GET(req:any) {
  const url = new URL(req.url);
  const customerId = url.searchParams.get('customerId');

  if (!customerId) {
    return new Response(JSON.stringify({ error: 'Customer ID is required' }), { status: 400 });
  }

  try {
    // Fetch invoices for the customer from Stripe
    const invoices = await stripe.paymentIntents.list({
      customer: customerId,
    });

    // Return the invoices in the response
    return new Response(JSON.stringify({ data: invoices.data }), { status: 200 });
  } catch (error) {
    console.error('Error fetching user invoices:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch user invoices' }), { status: 500 });
  }
}
