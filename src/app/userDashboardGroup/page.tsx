import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="h-4 w-4 text-wing-orange"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Subscriptions",
    value: "2,350",
    change: "+180.1% from last month",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="h-4 w-4 text-wing-cyan"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Sales",
    value: "12,234",
    change: "+19% from last month",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="h-4 w-4 text-wing-orange"
      >
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    title: "Active Now",
    value: "573",
    change: "+201 since last hour",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="h-4 w-4 text-wing-cyan"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
]

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6 transition-all">
  <div className="flex items-center justify-between space-y-2">
    <h2 className="text-3xl font-bold tracking-tight text-wing-blue dark:text-white">
      Welcome back, User!
    </h2>
  </div>

  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {stats.map((stat, index) => (
      <Card
        key={index}
        className={`border-2 ${index % 2 === 0 ? 'border-wing-orange' : 'border-wing-cyan'} bg-white dark:bg-gray-800 shadow-lg dark:shadow-none transition-all`}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-wing-blue dark:text-white">
            {stat.title}
          </CardTitle>
          <div className="text-wing-blue dark:text-white">
            {stat.icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-wing-blue dark:text-white">{stat.value}</div>
          <p className="text-xs text-muted-foreground dark:text-gray-400">
            {stat.change}
          </p>
        </CardContent>
      </Card>
    ))}
  </div>
</div>

  )
}
