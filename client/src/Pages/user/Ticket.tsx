import { useEffect, useState } from "react"
import { X, Calendar, MapPin, Clock, Ticket, RefreshCw } from "lucide-react"
import Header from "../../component/user/header"
import { cancelTicket, getTickets } from "../../service/user/userApi"
import { toast } from "react-toastify"
import type { TicketData } from "../../Types/basicTypes"

const mockUser = {
  name: "John Doe",
  email: "john.doe@email.com",
  userType: "attendee" as const,
  walletBalance: 500,
  about: "Event enthusiast"
}

export default function MyTicketsPage() {
  const [user] = useState(mockUser)
  const [tickets, setTickets] = useState<TicketData[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "cancelled">("upcoming")
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    if (!timeString) return 'Time TBD'
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const isEventUpcoming = (eventDate: string) => {
    return new Date(eventDate) >= new Date()
  }

  const upcomingTickets = tickets.filter(
    (ticket) => ticket.status === "confirmed" && isEventUpcoming(ticket.eventDate)
  )
  
  const pastTickets = tickets.filter(
    (ticket) => ticket.status === "confirmed" && !isEventUpcoming(ticket.eventDate)
  )
  
  const cancelledTickets = tickets.filter(
    (ticket) => ticket.status === "cancelled"
  )

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

  const handleCancelTicket = async(ticket: TicketData) => {
    if (confirm(`Are you sure you want to cancel your ticket for ${ticket.eventTitle}?`)) {
      const response = await cancelTicket(ticket.id);
      if(response && response.success){
        setTickets(tickets.map(t => t.id === ticket.id ? { ...t, status: "cancelled" } : t))
        toast.success(`Ticket cancelled! ₹${ticket.price} has been refunded to your wallet.`)
       }
      }
  }

  const handleViewTicketDetails = (ticket: any) => {
    setSelectedTicket(ticket)
  }

  const handleGetTicket = async() => {
    try {
      setLoading(true)
      const response = await getTickets()
      if(response.success){
        setTickets(response.data)
        toast.success(response.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch tickets")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleGetTicket()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin text-teal-600" />
              <span className="ml-2 text-gray-600">Loading your tickets...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm">
          {/* Tabs */}
          <div className="p-6 border-b">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
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
          </div>

          {/* Ticket List */}
          <div className="p-6">
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
                            ticket.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {ticket.status === "confirmed" ? "Confirmed" : "Cancelled"}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-teal-600 flex-shrink-0" />
                          <div>
                            <p className="font-medium">{ticket.eventVenue}</p>
                            <p className="text-sm text-gray-500">{ticket.eventAddress}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-teal-600 flex-shrink-0" />
                          <div>
                            <p className="font-medium">{formatDate(ticket.eventDate)}</p>
                            <p className="text-sm text-gray-500">
                              Purchased: {formatDate(ticket.purchaseDate)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-teal-600 flex-shrink-0" />
                          <div>
                            <p className="font-medium">{formatTime(ticket.eventTime)}</p>
                            <p className="text-sm text-gray-500">Ticket #{ticket.ticketNumber}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl font-bold text-teal-600">₹{ticket.price}</div>
                          {ticket.quantity > 1 && (
                            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              Qty: {ticket.quantity}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewTicketDetails(ticket)}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            View Details
                          </button>
                          {ticket.status === "confirmed" && isEventUpcoming(ticket.eventDate) && (
                            <button
                              onClick={() => handleCancelTicket(ticket)}
                              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                              <RefreshCw className="h-4 w-4" />
                              <span>Cancel</span>
                            </button>
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
      </div>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg border border-gray-200">
            <div className="p-6 bg-gradient-to-r from-teal-50 to-blue-50 rounded-t-2xl relative">
              <h3 className="text-2xl font-bold text-gray-900">Ticket Details</h3>
              <button
                onClick={() => setSelectedTicket(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {/* Event Title and Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Ticket className="h-5 w-5 text-teal-600" />
                    <h4 className="text-xl font-semibold text-gray-900">{selectedTicket.eventTitle}</h4>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedTicket.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedTicket.status === "confirmed" ? "Confirmed" : "Cancelled"}
                  </span>
                </div>

                {/* Event Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 text-teal-600" />
                      <span className="font-medium">Venue</span>
                    </div>
                    <p className="text-gray-900">{selectedTicket.eventVenue}</p>
                    <p className="text-sm text-gray-500">{selectedTicket.eventAddress}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <Calendar className="h-4 w-4 text-teal-600" />
                      <span className="font-medium">Date & Time</span>
                    </div>
                    <p className="text-gray-900">{formatDate(selectedTicket.eventDate)}</p>
                    <p className="text-sm text-gray-500">{formatTime(selectedTicket.eventTime)}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <Ticket className="h-4 w-4 text-teal-600" />
                      <span className="font-medium">Ticket Number</span>
                    </div>
                    <p className="text-gray-900 font-mono">{selectedTicket.ticketNumber}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <Ticket className="h-4 w-4 text-teal-600" />
                      <span className="font-medium">Quantity</span>
                    </div>
                    <p className="text-gray-900">{selectedTicket.quantity}</p>
                  </div>
                </div>

                {/* Attendee Info */}
                <div className="border-t pt-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Attendee Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-sm font-medium text-gray-600">Name</span>
                      <p className="text-gray-900">{user.name}</p>
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-gray-600">Email</span>
                      <p className="text-gray-900">{user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Price and Status */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-sm font-medium text-gray-600">Total Price Paid</span>
                      <p className="text-2xl font-bold text-teal-600">₹{selectedTicket.price}</p>
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-gray-600">Status</span>
                      <p
                        className={`font-semibold ${
                          selectedTicket.status === "confirmed" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {selectedTicket.status === "confirmed" ? "Confirmed" : "Cancelled"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
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