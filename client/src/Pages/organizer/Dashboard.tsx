import { useState } from "react"
import { Header } from "../../component/organizer/header"
import { StatsCards } from "../../component/organizer/stats-cards"
import { EventManagement } from "../../component/organizer/event-management"
import { AttendeesSection } from "../../component/organizer/attendees-section"
import { ProfileSection } from "../../component/organizer/profile-section"
import { CreateEventForm } from "../../component/organizer/create-event-form"
import { Button } from "../../component/organizer/ui/button"
import { Plus } from "lucide-react"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"events" | "attendees">("events")
  const [showProfile, setShowProfile] = useState(false)
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onProfileClick={() => setShowProfile(true)} />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <StatsCards />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("events")}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === "events"
                    ? "bg-teal-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                My Events
              </button>
              <button
                onClick={() => setActiveTab("attendees")}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === "attendees"
                    ? "bg-teal-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                Attendees
              </button>
            </div>

            <Button onClick={() => setShowCreateEvent(true)} className="bg-teal-600 hover:bg-teal-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>

          {activeTab === "events" && (
            <EventManagement selectedEventId={selectedEventId} onEventSelect={setSelectedEventId} />
          )}
          {activeTab === "attendees" && (
            <AttendeesSection
              selectedEventId={selectedEventId}
            />
          )}
        </div>
      </main>

      {showProfile && <ProfileSection onClose={() => setShowProfile(false)} />}
      {showCreateEvent && <CreateEventForm onClose={() => setShowCreateEvent(false)} />}
    </div>
  )
}
