import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../organizer/ui/card"
import { Button } from "../organizer/ui/button"
import { X, AlertTriangle, Loader2 } from "lucide-react"
import { deleteEvent } from "../../service/organizer/organizerApi"
import type { IEvent } from "../../Types/basicTypes"



interface DeleteEventModalProps {
  event: IEvent
  onClose: () => void
  onConfirm: (eventId: string) => void
}

export function DeleteEventModal({ event, onClose, onConfirm }: DeleteEventModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      
      const response = await deleteEvent(event._id)
      
      if (response.success) {
        onConfirm(event._id)
      } else {
        console.error("[v0] Failed to delete event")
      }
    } catch (error) {
      console.error("[v0] Error deleting event:", error)
    } finally {
      setIsLoading(false)
      onClose()
    }
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Delete Event
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-gray-700">
            <p className="mb-2">Are you sure you want to delete this event?</p>
            <div className="bg-gray-50 p-3 rounded-lg border">
              <p className="font-semibold text-gray-900">{event.title}</p>
              <p className="text-sm text-gray-600">{event.venue}</p>
              <p className="text-sm text-gray-600">{formatDate(event.startDate)}</p>
              <p className="text-sm text-gray-600">{event.ticketCount} tickets • ${event.ticketPrice} each</p>
            </div>
            <p className="mt-3 text-sm text-red-600 font-medium">
              This action cannot be undone. All attendee data and event information will be permanently removed.
            </p>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button 
              onClick={handleDelete} 
              className="flex-1 bg-red-600 hover:bg-red-700 text-white" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </div>
              ) : (
                "Delete Event"
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}