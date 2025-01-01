import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-2xl font-bold">Payment Cancelled</h1>
      <p>Your wingman flight booking was not completed.</p>
      <Link href="/">
        <Button>Try Again</Button>
      </Link>
    </div>
  )
}

