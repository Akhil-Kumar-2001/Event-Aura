import { Card, CardContent, CardHeader, CardTitle } from "../organizer/ui/card"
import { Button } from "../organizer/ui/button"
import { Badge } from "../organizer/ui/badge"
import { Calendar, MapPin, Users, Edit, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import { DeleteEventModal } from "./delete-event-modal"
import { EditEventForm } from "./edit-event-form"
import { getEvents } from "../../service/organizer/organizerApi"
import { getAttendees } from "../../service/organizer/organizerApi"
import { useAuthStore } from "../../store/userAuthStore"
import { useEventStore } from "../../store/eventStore" 
import { useAttendeeStore } from "../../store/attendeeStore" // Import the attendee store
import type { IAttendee, IEvent } from "../../Types/basicTypes"

interface EventManagementProps {
  selectedEventId: string | null
  onEventSelect: (eventId: string) => void
}

export function EventManagement({ selectedEventId, onEventSelect }: EventManagementProps) {

  const { events, setEvents } = useEventStore()
  const { addAttendee, clearAttendees } = useAttendeeStore() // Add clearAttendees method
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingEvent, setEditingEvent] = useState<IEvent | null>(null)
  const [deletingEvent, setDeletingEvent] = useState<IEvent | null>(null)
  const userId = useAuthStore((state) => state.user?.id)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        const fetchedEvents = await getEvents()
        console.log("[v0] Fetched events:", fetchedEvents)
        setEvents(fetchedEvents.data)
      } catch (err) {
        setError('Failed to load events. Please try again.')
        console.error('Error fetching events:', err)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchEvents()
    }
  }, [userId, setEvents])

  // Fetch attendees and store in useAttendeeStore when an event is selected
  useEffect(() => {
    const fetchAttendees = async () => {
      if (selectedEventId) {
        try {
          // Clear existing attendees first
          clearAttendees()
          
          const attendeesData = await getAttendees(selectedEventId)
          attendeesData.data.forEach((attendee: IAttendee) => {
            addAttendee({
              id: attendee.id, 
              name: attendee.name,
              email: attendee.email,
              event: attendee.event || "",
              eventId: selectedEventId,
              amount: attendee.amount || "0",
              purchaseDate: attendee.purchaseDate || new Date().toISOString(),
            })
          })
          console.log("[v0] Fetched attendees:", attendeesData)
        } catch (err) {
          console.error('Error fetching attendees:', err)
        }
      } else {
        // Clear attendees when no event is selected
        clearAttendees()
      }
    }

    fetchAttendees()
  }, [selectedEventId, addAttendee, clearAttendees])

  const handleEditEvent = (event: IEvent) => {
    setEditingEvent(event)
  }

  const handleDeleteEvent = (event: IEvent) => {
    setDeletingEvent(event)
  }

  const handleSaveEvent = (updatedEvent: IEvent) => {
    console.log("Saving event updates:", updatedEvent)
    const updatedEvents = events.map(event => 
      event._id === updatedEvent._id ? updatedEvent : event
    )
    setEvents(updatedEvents)
    setEditingEvent(null)
  }

  const handleConfirmDelete = (eventId: string) => {
    console.log("[v0] Confirming delete for event:", eventId)
    const filteredEvents = events.filter(event => event._id !== eventId)
    setEvents(filteredEvents)
    setDeletingEvent(null)
  }

  const calculateRevenue = (event: IEvent): string => {
    const soldTickets = Math.floor(Math.random() * event.ticketCount)
    const revenue = soldTickets * event.ticketPrice
    return `$${revenue.toLocaleString()}`
  }

  const getEventStatus = (event: IEvent): 'active' | 'upcoming' | 'completed' => {
    const now = new Date()
    const startDate = new Date(event.startDate)
    const endDate = new Date(event.endDate)
    
    if (now < startDate) return 'upcoming'
    if (now > endDate) return 'completed'
    return 'active'
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">My Events</h2>
        <div className="flex justify-center py-8">
          <div className="text-gray-500">Loading events...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">My Events</h2>
        <div className="flex justify-center py-8">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">My Events</h2>
        <div className="flex justify-center py-8">
          <div className="text-gray-500">No events found. Create your first event!</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">My Events</h2>

      <div className="grid gap-4">
        {events.map((event) => {
          const status = getEventStatus(event)
          const revenue = calculateRevenue(event)
          
          return (
            <Card
              key={event._id}
              className={`cursor-pointer transition-all ${
                selectedEventId === event._id
                  ? "bg-teal-50 border-teal-300 shadow-md"
                  : "bg-white border-gray-200 hover:shadow-sm"
              }`}
              onClick={() => onEventSelect(event._id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-gray-900">{event.title}</CardTitle>
                    {selectedEventId === event._id && (
                      <div className="text-sm text-teal-600 font-medium mt-1">✓ Selected for attendee view</div>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {event.venue}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(event.startDate)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {event.ticketCount} tickets available
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        status === "active"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : status === "upcoming"
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : "bg-gray-100 text-gray-800 border-gray-200"
                      }
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{revenue}</div>
                      <div className="text-sm text-gray-600">Revenue</div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <div>{event.address}</div>
                    <div>
                      {event.startTime} - {event.endTime}
                    </div>
                    <div className="text-xs mt-1">
                      ${event.ticketPrice} per ticket
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-200 hover:bg-gray-50 bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditEvent(event)
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteEvent(event)
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {editingEvent && (
        <EditEventForm 
          event={editingEvent} 
          onClose={() => setEditingEvent(null)} 
          onSave={handleSaveEvent} 
        />
      )}

      {deletingEvent && (
        <DeleteEventModal
          event={deletingEvent}
          onClose={() => setDeletingEvent(null)}
          onConfirm={() => handleConfirmDelete(deletingEvent._id)}
        />
      )}
    </div>
  )
}