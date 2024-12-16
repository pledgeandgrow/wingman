import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const packages = [
  {
    name: "Basic",
    price: "$999",
    description: "Essential features for small businesses",
    features: [
      "Access to Wingman network",
      "Basic support",
      "Up to 100,000 transactions/month",
      "Community forum access"
    ]
  },
  {
    name: "Pro",
    price: "$2,999",
    description: "Advanced features for growing enterprises",
    features: [
      "All Basic features",
      "Priority support",
      "Up to 1,000,000 transactions/month",
      "API access",
      "Custom integrations"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large organizations",
    features: [
      "All Pro features",
      "Dedicated account manager",
      "Unlimited transactions",
      "On-premise deployment option",
      "24/7 phone & email support",
      "Custom development services"
    ]
  }
]

export default function PremiumPackages() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-24">
      <div className="container mx-auto px-10">
        <h2 className="mb-12 text-center text-4xl font-light text-gray-900 md:text-5xl">
          Premium Partnership Packages
        </h2>
        <p className="mb-16 text-center text-xl text-gray-600">
          Choose the perfect package to elevate your partnership with Wingman
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <Card key={pkg.name} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">{pkg.name}</CardTitle>
                <p className="text-4xl font-bold text-blue-600">{pkg.price}</p>
                <p className="text-sm text-gray-500">{pkg.description}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={pkg.name === "Pro" ? "default" : "outline"}>
                  {pkg.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

