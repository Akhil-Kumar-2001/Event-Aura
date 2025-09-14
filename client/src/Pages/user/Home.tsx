import { useNavigate } from "react-router-dom"
import Header from "../../component/user/header"
import HeroSection from "../../component/user/hero-section"
import EventListing from "../../component/user/event-listing"
import Footer from "../../component/user/footer"
import { useAuthStore } from "../../store/userAuthStore"
import type { IEvent } from "../../Types/basicTypes"

export default function HomePage() {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  const handlePurchaseTicket = (eventId: number | string) => {
    if (!isAuthenticated) {
      navigate('/signin')
      return
    }
    navigate(`/event/${eventId}/checkout`)
  }

  const handleEventClick = (event: IEvent) => {
    navigate(`/event/${event._id}`)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header/>
      <HeroSection />
      <EventListing
        onPurchaseTicket={handlePurchaseTicket}
        onEventClick={handleEventClick}
      />
      <Footer />
    </div>
  )
}