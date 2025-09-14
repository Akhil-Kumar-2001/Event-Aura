import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useEventStore } from "../../store/eventStore";
import { getEvents } from "../../service/user/userApi";
import type { IEvent } from "../../Types/basicTypes";

interface EventListingProps {
  onPurchaseTicket: (eventId: string) => void;
  onEventClick: (event: IEvent) => void;
}

export default function EventListing({ onPurchaseTicket, onEventClick }: EventListingProps) {
  const { events, setEvents } = useEventStore();
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 4

  const totalPages = Math.ceil(events.length / eventsPerPage)
  const startIndex = (currentPage - 1) * eventsPerPage
  const currentEvents = events.slice(startIndex, startIndex + eventsPerPage)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getEvents();
        if (fetchedEvents) {
          setEvents(fetchedEvents.data);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    
    fetchEvents();
  }, [setEvents]);

  const maxDescriptionLength = 150;

  const truncateDescription = (description: string) => {
    if (description.length > maxDescriptionLength) {
      return description.slice(0, maxDescriptionLength) + "...";
    }
    return description;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8"> 
        <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Upcoming Events</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> 
          {currentEvents.map((event: IEvent) => (
            <div
              key={event._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 hover:bg-teal-50 transition-all duration-300 cursor-pointer transform"
              onClick={() => onEventClick(event)}
            >
              <div className="overflow-hidden">
                <img
                  src={event.coverImage || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              <div className="p-3">
                <h4 className="text-xl font-bold text-gray-900 mb-3 hover:text-teal-600 transition-colors duration-200">
                  {event.title}
                </h4>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-teal-600" />
                    <span>{event.venue}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-teal-600" />
                    <span>{new Date(event.startDate).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-teal-600" />
                    <span>{event.startTime}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">{truncateDescription(event.description)}</p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-teal-600">₹{event.ticketPrice}</span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPurchaseTicket(event._id);
                    }}
                    className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 hover:scale-105 hover:shadow-lg transition-all duration-200 font-semibold"
                  >
                    Purchase Ticket
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 py-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors"
          >
            Previous
          </button>

          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}