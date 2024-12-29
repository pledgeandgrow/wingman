export interface Flight {
	id: string
	wingman_id: string
	flight_number: string
	departure_airport: string
	arrival_airport: string
	departure_time: string
	arrival_time: string
	available_weight: number
	created_at: string
	description: string
  }
  
  export interface SearchParams {
	departure?: string
	destination?: string
	date?: string
	weight?: string
  }
  
  