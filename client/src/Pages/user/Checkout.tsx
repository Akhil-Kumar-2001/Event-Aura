import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TicketCheckout from "../../component/user/ticket-checkout"
import Header from "../../component/user/header"
import Footer from "../../component/user/footer"
import { useAuthStore } from "../../store/userAuthStore"
import { useEventStore } from "../../store/eventStore"
import type { IEvent } from "../../Types/basicTypes"

export default function EventCheckoutPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const { events } = useEventStore()
  const [event, setEvent] = useState<IEvent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      alert('Please log in to purchase tickets')
      navigate('/signin', { replace: true })
      return
    }

    if (eventId) {
      const foundEvent = events.find(e => e._id === eventId)
      if (foundEvent) {
        setEvent(foundEvent)
      } else {
        navigate('/', { replace: true })
      }
    } else {
      navigate('/', { replace: true })
    }
    setLoading(false)
  }, [eventId, navigate, isAuthenticated, events])

  const handleClose = () => {
    navigate('/')
  }

  const handleBackToDetails = () => {
    if (eventId) {
      navigate(`/event/${eventId}`)
    } else {
      navigate('/')
    }
  }

  const handlePurchaseComplete = (paymentMethod: "wallet" | "stripe" | "razorpay") => {
    navigate('/', { replace: true })
    setTimeout(() => {
      alert(`Ticket purchased successfully using ${paymentMethod === "wallet" ? "wallet" : paymentMethod}!`)
    }, 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-6">The event you're trying to purchase tickets for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <TicketCheckout
        event={event}
        onClose={handleClose}
        onBackToDetails={handleBackToDetails}
        onPurchaseComplete={handlePurchaseComplete}
      />
      <Footer />
    </div>
  )
}