import { useState, useCallback } from "react"
import { X, Edit, Save, XCircle, MapPin, Calendar, Clock, Ticket, Mail, Briefcase, Wallet } from "lucide-react"
import { useAuthStore } from '../../store/userAuthStore'
import { useNavigate } from 'react-router-dom'
import Header from "../../component/user/header"

interface Ticket {
  id: number
  eventTitle: string
  eventVenue: string
  eventDate: string
  eventTime: string
  price: number
  purchaseDate: string
  status: "active" | "cancelled"
}

interface ExtendedUser {
  id: string
  name: string
  email: string
  userType: "attendee" | "organizer"
  walletBalance: number
  about?: string
}

// Mock ticket data
const mockTickets: Ticket[] = [
  {
    id: 1,
    eventTitle: "Tech Conference 2024",
    eventVenue: "Convention Center",
    eventDate: "2024-03-15",
    eventTime: "09:00 AM",
    price: 150,
    purchaseDate: "2024-02-10",
    status: "active",
  },
  {
    id: 2,
    eventTitle: "Music Festival",
    eventVenue: "Central Park",
    eventDate: "2024-03-22",
    eventTime: "06:00 PM",
    price: 75,
    purchaseDate: "2024-02-15",
    status: "active",
  },
  {
    id: 3,
    eventTitle: "Art Gallery Opening",
    eventVenue: "Modern Art Museum",
    eventDate: "2024-01-20",
    eventTime: "07:00 PM",
    price: 25,
    purchaseDate: "2024-01-15",
    status: "cancelled",
  },
]

export default function UserProfile() {
  const navigate = useNavigate()
  
  const user = useAuthStore(state => state.user)
  const role = useAuthStore(state => state.role)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const accessToken = useAuthStore(state => state.accessToken)
  const setAuth = useAuthStore(state => state.setAuth)

  const [editedUser, setEditedUser] = useState<ExtendedUser>({
    id: user?.id || "",
    name: user?.name || "User",
    email: user?.email || "",
    userType: role || "attendee",
    walletBalance: 500,
    about: "",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [tickets, setTickets] = useState(mockTickets)
  const [activeTab, setActiveTab] = useState<"active" | "past">("active")

  const handleSave = useCallback(() => {
    setAuth(true, {
      user: {
        id: editedUser.id,
        name: editedUser.name,
        email: editedUser.email,
      },
      accessToken: accessToken || "",
      role: editedUser.userType,
    })
    setIsEditing(false)
  }, [editedUser, accessToken, setAuth])

  const handleCancel = useCallback(() => {
    setEditedUser({
      id: user?.id || "",
      name: user?.name || "User",
      email: user?.email || "",
      userType: role || "attendee",
      walletBalance: editedUser.walletBalance,
      about: editedUser.about || "",
    })
    setIsEditing(false)
  }, [user, role, editedUser.walletBalance, editedUser.about])

  const handleCancelTicket = useCallback((ticketId: number) => {
    const ticket = tickets.find((t) => t.id === ticketId)
    if (ticket && ticket.status === "active") {
      const updatedUser = {
        ...editedUser,
        walletBalance: editedUser.walletBalance + ticket.price,
      }
      setEditedUser(updatedUser)
      setAuth(true, {
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
        },
        accessToken: accessToken || "",
        role: updatedUser.userType,
      })

      setTickets(prevTickets => prevTickets.map((t) => 
        t.id === ticketId ? { ...t, status: "cancelled" as const } : t
      ))

      alert(`Ticket cancelled! $${ticket.price} refunded to your wallet.`)
    }
  }, [tickets, editedUser, accessToken, setAuth])

  const activeTickets = tickets.filter((t) => t.status === "active" && new Date(t.eventDate) >= new Date())
  const pastTickets = tickets.filter((t) => t.status === "cancelled" || new Date(t.eventDate) < new Date())

  if (!isAuthenticated) {
    navigate('/')
    return null
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const getProfileColor = (name: string) => {
    const colors = [
      'bg-gradient-to-br from-purple-500 to-pink-500',
      'bg-gradient-to-br from-blue-500 to-cyan-500',
      'bg-gradient-to-br from-green-500 to-emerald-500',
      'bg-gradient-to-br from-orange-500 to-red-500',
      'bg-gradient-to-br from-indigo-500 to-purple-500',
      'bg-gradient-to-br from-teal-500 to-green-500',
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
          {/* Cover Background */}
          <div className="h-32 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 relative">
            <button 
              onClick={() => navigate('/')} 
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
          
          {/* Profile Info */}
          <div className="px-8 pb-8 -mt-16 relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
              {/* Profile Picture */}
              <div className={`w-32 h-32 rounded-full ${getProfileColor(editedUser.name)} flex items-center justify-center text-white text-4xl font-bold shadow-lg border-4 border-white`}>
                {getInitials(editedUser.name)}
              </div>
              
              {/* User Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{editedUser.name}</h1>
                    <div className="flex items-center gap-4 text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{editedUser.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span className="capitalize">{editedUser.userType}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-lg">
                      <Wallet className="h-5 w-5 text-teal-600" />
                      <span className="font-semibold text-teal-600">${editedUser.walletBalance}</span>
                      <span className="text-gray-500">wallet balance</span>
                    </div>
                  </div>
                  
                  {/* Edit Button */}
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl"
                    >
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all shadow-lg"
                      >
                        <Save className="h-4 w-4" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-all shadow-lg"
                      >
                        <XCircle className="h-4 w-4" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* About Section */}
            <div className="mt-6 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
              {isEditing ? (
                <textarea
                  value={editedUser.about || ""}
                  onChange={(e) => setEditedUser({ ...editedUser, about: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">
                  {editedUser.about || "No description provided. Click edit to add something about yourself!"}
                </p>
              )}
            </div>

            {/* Editable Fields (only visible when editing) */}
            {isEditing && (
              <div className="mt-6 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={editedUser.name}
                      onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tickets Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Ticket className="h-6 w-6 text-teal-600" />
            <h2 className="text-2xl font-bold text-gray-900">My Tickets</h2>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-100 rounded-xl p-1 max-w-md">
            <button
              onClick={() => setActiveTab("active")}
              className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "active" 
                  ? "bg-white text-teal-600 shadow-md" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Active ({activeTickets.length})
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "past" 
                  ? "bg-white text-teal-600 shadow-md" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Past ({pastTickets.length})
            </button>
          </div>

          {/* Ticket List */}
          <div className="grid gap-4">
            {(activeTab === "active" ? activeTickets : pastTickets).map((ticket) => (
              <div
                key={ticket.id}
                className={`border-2 rounded-xl p-6 transition-all hover:shadow-lg ${
                  ticket.status === "cancelled" 
                    ? "bg-gray-50 border-gray-200" 
                    : "bg-white border-gray-200 hover:border-teal-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="text-xl font-semibold text-gray-900">{ticket.eventTitle}</h4>
                      {ticket.status === "cancelled" && (
                        <span className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full font-medium">
                          Cancelled
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4 text-teal-600" />
                        <span>{ticket.eventVenue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4 text-teal-600" />
                        <span>{new Date(ticket.eventDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4 text-teal-600" />
                        <span>{ticket.eventTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-teal-600">${ticket.price}</span>
                        <span className="text-gray-500 ml-3 text-sm">
                          Purchased: {new Date(ticket.purchaseDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {ticket.status === "active" && new Date(ticket.eventDate) >= new Date() && (
                    <button
                      onClick={() => handleCancelTicket(ticket.id)}
                      className="ml-6 flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg"
                    >
                      <XCircle className="h-4 w-4" />
                      <span className="font-medium">Cancel</span>
                    </button>
                  )}
                </div>
              </div>
            ))}

            {(activeTab === "active" ? activeTickets : pastTickets).length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Ticket className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No {activeTab} tickets found</p>
                <p className="text-sm">Your {activeTab} tickets will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}