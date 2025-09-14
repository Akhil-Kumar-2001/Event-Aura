import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import EventDetails from "../../component/user/event-details"
import Header from "../../component/user/header"
import Footer from "../../component/user/footer"
import { useAuthStore } from "../../store/userAuthStore"
import { useEventStore } from "../../store/eventStore"
import type { IEvent } from "../../Types/basicTypes"

export default function EventDetailsPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const { events } = useEventStore()
  const [event, setEvent] = useState<IEvent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
  }, [eventId, events, navigate])

  const handleClose = () => {
    navigate('/')
  }

  const handleProceedToCheckout = (event: IEvent) => {
    if (!isAuthenticated) {
      alert('Please log in to purchase tickets')
      return
    }
    navigate(`/event/${event._id}/checkout`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-6">The event you're looking for doesn't exist.</p>
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
      <EventDetails
        event={event}
        onClose={handleClose}
        onProceedToCheckout={handleProceedToCheckout}
      />
      <Footer />
    </div>
  )
}