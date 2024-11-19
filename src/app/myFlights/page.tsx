import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plane } from 'lucide-react'

export default function Component() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome Mehdi</h1>
        <Button className="bg-[#002466] hover:bg-[#002466]/90 text-white">Post a flight</Button>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Your Flights</h2>
        
        <Tabs defaultValue="to-come">
          <TabsList className="grid w-full grid-cols-4 max-w-[400px]">
            <TabsTrigger value="to-come" className="data-[state=active]:bg-[#002466] data-[state=active]:text-white">
              To come
            </TabsTrigger>
            <TabsTrigger value="finished">
              Finished
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled
            </TabsTrigger>
            <TabsTrigger value="all">
              All
            </TabsTrigger>
          </TabsList>
        </Tabs>

       

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[15, 20, 25].map((weight) => (
            <Card key={weight} className="bg-[#002466] text-white p-6 relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span>UAE</span>
                    <Plane className="h-4 w-4" />
                    <span>NYC</span>
                  </div>
                  <div className="text-sm opacity-80">Abu Dhabi</div>
                  <div className="text-sm opacity-80">New York City</div>
                </div>
                <div className="text-sm opacity-80">
                  FLIGHT NUMBER
                  <div>AB555</div>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-sm opacity-80">DATE & TIME</div>
                  <div>Feb 26 11:00pm</div>
                </div>
                <div className="text-xl font-bold">{weight} KG</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}