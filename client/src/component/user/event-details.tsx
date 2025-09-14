import { Calendar, MapPin, Clock, Users, ArrowLeft, Home } from "lucide-react"
import type { IEvent } from "../../Types/basicTypes"
import Header from "./header"

interface EventDetailsProps {
  event: IEvent
  onClose: () => void
  onProceedToCheckout: (event: IEvent) => void 
}

export default function EventDetails({ event, onClose, onProceedToCheckout }: EventDetailsProps) {

  const handlePurchaseClick = () => {
    onProceedToCheckout(event) 
  }

  return (
    <div className="fixed inset-0 bg-white flex flex-col z-50">
      {/* Header Component */}
      <Header />
      
      <div className="flex-1 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-full overflow-y-auto border border-gray-300 shadow-md">
          {/* Cover Image */}
          <div className="relative">
            <img
              src={event.coverImage || "/placeholder.svg"}
              alt={event.title}
              className="w-full h-64 object-cover rounded-t-xl"
            />
            <button
              onClick={onClose}
              className="absolute top-4 left-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">{event.title}</h1>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-3 text-teal-600" />
                    <span className="text-lg">{event.venue}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Home className="h-5 w-5 mr-3 text-teal-600" />
                    <span className="text-lg">{event.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-3 text-teal-600" />
                    <span className="text-lg">
                      {new Date(event.startDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })} - {new Date(event.endDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-3 text-teal-600" />
                    <span className="text-lg">{event.startTime} - {event.endTime}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-3 text-teal-600" />
                    <span className="text-lg">{event.ticketCount} tickets available</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">{event.description}</p>
                  <p className="text-gray-600 leading-relaxed text-lg mt-4">
                    This is an incredible opportunity to connect with like-minded individuals, learn from industry
                    experts, and experience something truly memorable. Don't miss out on this amazing event that promises
                    to deliver exceptional value and unforgettable moments.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-teal-600 rounded-full mr-3"></span>
                      Full access to all event activities
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-teal-600 rounded-full mr-3"></span>
                      Complimentary refreshments
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-teal-600 rounded-full mr-3"></span>
                      Networking opportunities
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-teal-600 rounded-full mr-3"></span>
                      Event materials and resources
                    </li>
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6 sticky top-4">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-teal-600 mb-2">₹{event.ticketPrice}</div>
                    <div className="text-gray-600">per ticket</div>
                  </div>

                  <button
                    onClick={handlePurchaseClick} 
                    className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors font-semibold text-lg mb-4"
                  >
                    Purchase Ticket
                  </button>

                  <div className="text-center text-sm text-gray-500 mb-6">Secure payment • Instant confirmation</div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Event Highlights</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>🎯 Expert speakers</div>
                      <div>🤝 Networking sessions</div>
                      <div>🎁 Exclusive materials</div>
                      <div>📱 Mobile check-in</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}