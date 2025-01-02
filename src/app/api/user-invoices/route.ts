import supabase from '@/utils/supabase'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const customerId = url.searchParams.get('customerId')

  if (!customerId) {
    return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 })
  }

  try {
    const { data, error } = await supabase
    .schema('stripe')
    .from('invoices')
      .select(`*`)
      

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching user invoices:', error)
    return NextResponse.json({ error: 'Failed to fetch user invoices' }, { status: 500 })
  }
}

