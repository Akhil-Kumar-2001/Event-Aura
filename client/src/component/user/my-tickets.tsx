
import { useState } from "react"
import { X, Calendar, MapPin, Clock, Ticket, Download, RefreshCw } from "lucide-react"

interface User {
  name: string
  email: string
  userType: "attendee" | "organizer"
  walletBalance: number
  about?: string
}

interface MyTicketsProps {
  user: User
  onClose: () => void
  onRefundTicket: (ticketId: number, amount: number) => void
}

// Enhanced mock ticket data with more details
const mockUserTickets = [
  {
    id: 1,
    eventId: 1,
    eventTitle: "Tech Conference 2024",
    eventVenue: "Convention Center",
    eventDate: "2024-03-15",
    eventTime: "09:00 AM",
    eventAddress: "123 Convention St, Tech City, TC 12345",
    price: 150,
    purchaseDate: "2024-02-10",
    status: "active",
    ticketNumber: "TC2024-001",
    qrCode:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwMCIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjZmZmIi8+PC9zdmc+",
  },
  {
    id: 2,
    eventId: 2,
    eventTitle: "Music Festival",
    eventVenue: "Central Park",
    eventDate: "2024-03-22",
    eventTime: "06:00 PM",
    eventAddress: "Central Park, Music City, MC 54321",
    price: 75,
    purchaseDate: "2024-02-15",
    status: "active",
    ticketNumber: "MF2024-002",
    qrCode:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwMCIvPjxyZWN0IHg9IjE1IiB5PSIxNSIgd2lkdGg9IjcwIiBoZWlnaHQ9IjcwIiBmaWxsPSIjZmZmIi8+PC9zdmc+",
  },
  {
    id: 3,
    eventId: 4,
    eventTitle: "Art Gallery Opening",
    eventVenue: "Modern Art Museum",
    eventDate: "2024-01-20",
    eventTime: "07:00 PM",
    eventAddress: "456 Art Ave, Culture City, CC 67890",
    price: 25,
    purchaseDate: "2024-01-15",
    status: "cancelled",
    ticketNumber: "AG2024-003",
    qrCode:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwMCIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZmZmIi8+PC9zdmc+",
  },
  {
    id: 4,
    eventId: 5,
    eventTitle: "Business Summit",
    eventVenue: "Business Center",
    eventDate: "2024-04-12",
    eventTime: "08:00 AM",
    eventAddress: "789 Business Blvd, Commerce City, CC 13579",
    price: 200,
    purchaseDate: "2024-02-20",
    status: "active",
    ticketNumber: "BS2024-004",
    qrCode:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwMCIvPjxyZWN0IHg9IjI1IiB5PSIyNSIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjZmZmIi8+PC9zdmc+",
  },
]

export default function MyTickets({ user, onClose, onRefundTicket }: MyTicketsProps) {
  const [tickets] = useState(mockUserTickets)
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "cancelled">("upcoming")
  const [selectedTicket, setSelectedTicket] = useState<any>(null)

  const upcomingTickets = tickets.filter(
    (ticket) => ticket.status === "active" && new Date(ticket.eventDate) >= new Date(),
  )
  const pastTickets = tickets.filter((ticket) => ticket.status === "active" && new Date(ticket.eventDate) < new Date())
  const cancelledTickets = tickets.filter((ticket) => ticket.status === "cancelled")

  const getCurrentTickets = () => {
    switch (activeTab) {
      case "upcoming":
        return upcomingTickets
      case "past":
        return pastTickets
      case "cancelled":
        return cancelledTickets
      default:
        return upcomingTickets
    }
  }

  const handleCancelTicket = (ticket: any) => {
    if (confirm(`Are you sure you want to cancel your ticket for ${ticket.eventTitle}?`)) {
      onRefundTicket(ticket.id, ticket.price)
      alert(`Ticket cancelled! $${ticket.price} has been refunded to your wallet.`)
    }
  }

  const handleDownloadTicket = (ticket: any) => {
    // In a real app, this would generate and download a PDF ticket
    alert(`Downloading ticket for ${ticket.eventTitle}...`)
  }

  const handleViewTicketDetails = (ticket: any) => {
    setSelectedTicket(ticket)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-teal-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Tickets</h2>
            <p className="text-gray-600">Manage your event tickets</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "upcoming" ? "bg-white text-teal-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Upcoming ({upcomingTickets.length})
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "past" ? "bg-white text-teal-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Past Events ({pastTickets.length})
            </button>
            <button
              onClick={() => setActiveTab("cancelled")}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "cancelled" ? "bg-white text-teal-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Cancelled ({cancelledTickets.length})
            </button>
          </div>

          {/* Ticket List */}
          <div className="space-y-4">
            {getCurrentTickets().map((ticket) => (
              <div
                key={ticket.id}
                className={`border rounded-xl p-6 transition-all hover:shadow-lg ${
                  ticket.status === "cancelled" ? "bg-gray-50 border-gray-200" : "bg-white border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <Ticket className="h-5 w-5 text-teal-600" />
                      <h3 className="text-xl font-semibold text-gray-900">{ticket.eventTitle}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          ticket.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {ticket.status === "active" ? "Active" : "Cancelled"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-teal-600" />
                        <div>
                          <p className="font-medium">{ticket.eventVenue}</p>
                          <p className="text-sm text-gray-500">{ticket.eventAddress}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-teal-600" />
                        <div>
                          <p className="font-medium">{new Date(ticket.eventDate).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-500">
                            Purchased: {new Date(ticket.purchaseDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-teal-600" />
                        <div>
                          <p className="font-medium">{ticket.eventTime}</p>
                          <p className="text-sm text-gray-500">Ticket #{ticket.ticketNumber}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-teal-600">${ticket.price}</div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewTicketDetails(ticket)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          View Details
                        </button>
                        {ticket.status === "active" && (
                          <>
                            <button
                              onClick={() => handleDownloadTicket(ticket)}
                              className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                            >
                              <Download className="h-4 w-4" />
                              <span>Download</span>
                            </button>
                            {new Date(ticket.eventDate) >= new Date() && (
                              <button
                                onClick={() => handleCancelTicket(ticket)}
                                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                              >
                                <RefreshCw className="h-4 w-4" />
                                <span>Cancel</span>
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {getCurrentTickets().length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Ticket className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
                <p>You don't have any {activeTab} tickets yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Ticket Details</h3>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <img src={selectedTicket.qrCode || "/placeholder.svg"} alt="QR Code" className="w-32 h-32 mx-auto" />
                </div>
                <p className="text-sm text-gray-600">Scan this QR code at the event entrance</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Event</label>
                  <p className="text-gray-900">{selectedTicket.eventTitle}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ticket Number</label>
                  <p className="text-gray-900 font-mono">{selectedTicket.ticketNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Attendee</label>
                  <p className="text-gray-900">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price Paid</label>
                  <p className="text-gray-900 font-semibold">${selectedTicket.price}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
