import { Card, CardContent, CardHeader, CardTitle } from "../organizer/ui/card"
import { DollarSign, Calendar, Ticket } from "lucide-react"

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-teal-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">$45,231.89</div>
          <p className="text-xs text-gray-600">+20.1% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Active Events</CardTitle>
          <Calendar className="h-4 w-4 text-teal-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">12</div>
          <p className="text-xs text-gray-600">+3 new this week</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Tickets Sold</CardTitle>
          <Ticket className="h-4 w-4 text-teal-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">2,350</div>
          <p className="text-xs text-gray-600">+180 this week</p>
        </CardContent>
      </Card>
    </div>
  )
}
