import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Flight } from '@/types/flights'
import { Plane } from 'lucide-react'

function getInitials(name: string) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function formatDateTime(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function FlightCard({ flight }: { flight: Flight }) {
  const departureDateTime = formatDateTime(flight.departure_time)
  const arrivalDateTime = formatDateTime(flight.arrival_time)
  
  const travelTime = Math.round(
    (new Date(flight.arrival_time).getTime() - new Date(flight.departure_time).getTime()) / 
    (1000 * 60 * 60)
  )

  const initials = getInitials(flight.wingman?.name || '')
  const avatarUrl = `https://ui-avatars.com/api/?name=${initials}&background=random`

  return (
    <Link
      className="bg-white border border-gray-200 rounded-lg shadow-lg hover:border-2 hover:border-wing-orange"
      href={`/flights/${flight.id}`}
    >
      <div className="flex gap-6 text-left p-6 justify-between">
        <div className="flex gap-6">
          <div className="flex flex-col gap-2 text-left">
            <strong className="text-lg text-gray-800">{departureDateTime}</strong>
            <span className="text-sm text-gray-600">{flight.departure_airport}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</span>
            <span>{travelTime} hours</span>
            <Plane className="w-4 h-4 -rotate-12" />
            <span>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</span>
          </div>
          <div className="flex flex-col gap-2 text-left">
            <strong className="text-lg text-gray-800">{arrivalDateTime}</strong>
            <span className="text-sm text-gray-600">{flight.arrival_airport}</span>
          </div>
        </div>
        <div>
          <p className="text-3xl text-gray-900">{flight.available_weight} kg</p>
        </div>
      </div>

      <div className="w-full h-0.5 bg-gray-300"></div>

      <div className="text-right px-3 py-3 flex justify-between items-center">
        <Plane className="w-6 h-6 -rotate-12" />
        <Link href={`/users/${flight.wingman_id}`}>
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src={avatarUrl} alt={flight.wingman?.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <p className="text-sm font-medium text-black">{flight.wingman?.name}</p>
            </div>
          </div>
        </Link>
      </div>
    </Link>
  )
}

