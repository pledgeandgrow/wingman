import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Plane } from 'lucide-react'
import { Flight } from '@/app/types/flights'
import { formatDateTime } from '@/lib/dateFormat'

function getInitials(name) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function FlightCard({ flight }) {
  const departureDateTime = formatDateTime(flight.departure_time)
  const arrivalDateTime = formatDateTime(flight.arrival_time)
  
  const travelTime = Math.round(
    (new Date(flight.arrival_time).getTime() - new Date(flight.departure_time).getTime()) / 
    (1000 * 60 * 60)
  )

  const initials = getInitials(flight.wingman.name)
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(flight.wingman.name)}&background=random`

  return (
    <Link
      className="block bg-white border border-gray-200 rounded-lg shadow-lg hover:border-2 hover:border-wing-orange transition-all duration-300"
      href={`/flights/${flight.id}`}
    >
      <div className="flex gap-6 text-left p-6 justify-between items-center">
        <div className="flex gap-6 items-center">
          <div className="flex flex-col gap-2 text-left">
            <strong className="text-lg text-gray-800">{departureDateTime}</strong>
            <span className="text-sm text-gray-600">{flight.departure_airport}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="hidden md:inline">⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</span>
            <span>{travelTime} hours</span>
            <Plane className="w-4 h-4 -rotate-12" />
            <span className="hidden md:inline">⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</span>
          </div>
          <div className="flex flex-col gap-2 text-left">
            <strong className="text-lg text-gray-800">{arrivalDateTime}</strong>
            <span className="text-sm text-gray-600">{flight.arrival_airport}</span>
          </div>
        </div>
        <div>
          <p className="text-3xl text-gray-900 font-bold">{flight.available_weight} kg</p>
        </div>
      </div>

      <div className="w-full h-0.5 bg-gray-200"></div>

      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Plane className="w-6 h-6 text-gray-500" />
          <span className="text-sm text-gray-600">{flight.flight_number}</span>
        </div>
        <div href={`/users/${flight.wingman_id}`} className="flex items-center hover:underline">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatarUrl} alt={flight.wingman.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">{flight.wingman.name}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

