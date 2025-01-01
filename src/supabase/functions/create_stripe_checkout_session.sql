create or replace function create_stripe_checkout_session(
  flight_id uuid,
  success_url text,
  cancel_url text
)
returns json
language plpgsql
security definer
as $$
declare
  flight_data record;
  checkout_session json;
begin
  -- Fetch flight data
  select * into flight_data from flights where id = flight_id;
  
  if not found then
    raise exception 'Flight not found';
  end if;

  -- Create Stripe checkout session
  select stripe.create_checkout_session(
    json_build_object(
      'payment_method_types', array['card'],
      'line_items', json_build_array(
        json_build_object(
          'price_data', json_build_object(
            'currency', 'usd',
            'unit_amount', flight_data.price * 100, -- Stripe expects amount in cents
            'product_data', json_build_object(
              'name', 'Flight ' || flight_data.flight_number,
              'description', 'From ' || flight_data.departure_airport || ' to ' || flight_data.arrival_airport
            )
          ),
          'quantity', 1
        )
      ),
      'mode', 'payment',
      'success_url', success_url,
      'cancel_url', cancel_url
    )
  ) into checkout_session;

  return checkout_session;
end;
$$;

