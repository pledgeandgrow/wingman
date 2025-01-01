import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-2xl font-bold">Payment Successful!</h1>
      <p>Your wingman flight has been booked.</p>
      <Link href="/">
        <Button>Book Another Flight</Button>
      </Link>
    </div>
  )
}

