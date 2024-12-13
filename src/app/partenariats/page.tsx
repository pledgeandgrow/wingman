import { Button } from "@/components/ui/button"
import PartnerTypes from "./components/types-partenariats"

export default function Hero() {
  return (
   <div>
	 <div className="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-blue-600 via-[#1E3A8A] to-blue-400 px-20">
      {/* Decorative pattern */}
      <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
        <svg
          viewBox="0 0 400 400"
          fill="none"
          stroke="white"
          strokeWidth="1"
          className="h-full w-full"
        >
          <circle cx="200" cy="200" r="150" />
          <circle cx="200" cy="200" r="100" />
          <circle cx="200" cy="200" r="50" />
          <path d="M50,200 L350,200 M200,50 L200,350" />
          <path d="M120,120 L280,280 M280,120 L120,280" />
        </svg>
      </div>

      {/* Content */}
      <div className="max-w-4xl w-full">
        <div className="relative mx-auto px-4 py-24">
          <div className="max-w-3xl space-y-8">
            <h1 className="text-5xl font-light text-white md:text-6xl">
              Partner with Hedera
            </h1>
            
            <p className="text-xl text-white/90">
              The Hedera Partner Program is a vital component in realizing Hedera's
              mission of creating a decentralized ecosystem adopted by web3
              applications, enterprises, and retail users across the globe.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-gray-900 hover:bg-white/90"
              >
                EXPLORE PARTNERS
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white bg-transparent hover:bg-white"
              >
                JOIN US
              </Button>
            </div>

            <div className="space-y-6 pt-12">
              <p className="text-lg text-white/90">
                By joining the program, Enterprise Application Providers, Advisory &
                Consulting firms, and Technical Integrators have the opportunity of
                incorporating Hedera into their offerings, unlocking value for their
                customers and driving growth of their business.
              </p>
              
              <p className="text-lg text-white/90">
                Whether you serve start-ups on the cutting edge of disruption or
                established Fortune 500 companies embarking on a digital transformation,
                we welcome you to join us in building the future of web3.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
	<PartnerTypes/>
   </div>
  )
}

