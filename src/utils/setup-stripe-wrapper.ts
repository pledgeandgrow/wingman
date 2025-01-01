import supabase from "./supabase"

async function setupStripeWrapper() {
	try {
	  // Enable the wrappers extension
	  await supabase.rpc('extensions.create_extension', { name: 'wrappers' })
  
	  // Enable the Stripe wrapper
	  await supabase.rpc('extensions.create_foreign_data_wrapper', {
		wrapper_name: 'stripe_wrapper',
		handler: 'stripe_fdw_handler',
		validator: 'stripe_fdw_validator'
	  })
  
	  // Create a server for the Stripe wrapper
	  await supabase.rpc('extensions.create_server', {
		server_name: 'stripe_server',
		fdw_name: 'stripe_wrapper',
		options: {
		  api_key: process.env.NEXT_PUBLIC_STRIPE_SECRET,
		  api_version: '2023-08-16'
		}
	  })
  
	  // Create a schema for Stripe data
	  await supabase.rpc('extensions.create_schema', { schema_name: 'stripe' })
  
	  // Create a foreign table for Stripe customers
	  await supabase.rpc('extensions.create_foreign_table', {
		schema_name: 'stripe',
		table_name: 'customers',
		server_name: 'stripe_server',
		options: { object: 'customers' }
	  })
  
	  console.log('Stripe wrapper setup completed successfully')
	} catch (error) {
	  console.error('Error setting up Stripe wrapper:', error)
	}
  }
  
  setupStripeWrapper()