import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PartnerTypes() {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="h-[2px] w-full bg-gradient-to-r from-transparent via-gray-400 to-transparent"
            style={{
              transform: `translateY(${i * 50}px) rotate(-5deg)`,
              opacity: 0.5 - i * 0.02,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <h2 className="mb-16 text-4xl font-light md:text-5xl">
          Hedera Partner Types
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-blue-500">
                ENTERPRISE APPLICATION PROVIDERS
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Enterprise Application Providers assist their customers to streamline core business processes, enter new markets, and modernize their legacy systems. Stay ahead of the curve by incorporating Hedera into your client-facing services and products to future-proof your business across a wide range of use cases.
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-blue-500">
                ADVISORY & CONSULTING FIRMS
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Advisory & Consulting Firms are instrumental in driving adoption of Hedera in Fortune 500 organizations applying their deep domain expertise, technical knowledge and enterprise implementation skills. Work directly with clients as a trusted business consultant and technical advisor, using Hedera to turn their digital transformations visions into actionable roadmaps.
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-blue-500">
                TECHNICAL INTEGRATORS
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Technical Integrators apply their breadth of expertise across various domains, technologies, and development stack to drive startup & enterprise adoption of Hedera. Get trained and contracted to build decentralized applications in the Hedera ecosystem and support development of the Hedera codebase.
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

