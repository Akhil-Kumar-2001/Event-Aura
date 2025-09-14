// import { Card, CardContent, CardHeader, CardTitle } from "../organizer/ui/card"
// import { Button } from "../organizer/ui/button"
// import { Badge } from "../organizer/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "../organizer/ui/avatar"
// import { Mail, Download } from "lucide-react"

// const attendees = [
//   {
//     id: 1,
//     name: "Alice Johnson",
//     email: "alice@example.com",
//     eventId: 1,
//     event: "Tech Conference 2024",
//     ticketType: "VIP",
//     purchaseDate: "2024-01-15",
//     amount: "$150",
//   },
//   {
//     id: 2,
//     name: "Bob Smith",
//     email: "bob@example.com",
//     eventId: 1,
//     event: "Tech Conference 2024",
//     ticketType: "Regular",
//     purchaseDate: "2024-01-20",
//     amount: "$75",
//   },
//   {
//     id: 3,
//     name: "Carol Davis",
//     email: "carol@example.com",
//     eventId: 2,
//     event: "Music Festival",
//     ticketType: "Early Bird",
//     purchaseDate: "2024-02-01",
//     amount: "$120",
//   },
//   {
//     id: 4,
//     name: "David Wilson",
//     email: "david@example.com",
//     eventId: 3,
//     event: "Business Workshop",
//     ticketType: "Standard",
//     purchaseDate: "2024-02-10",
//     amount: "$50",
//   },
//   {
//     id: 5,
//     name: "Emma Brown",
//     email: "emma@example.com",
//     eventId: 1,
//     event: "Tech Conference 2024",
//     ticketType: "Regular",
//     purchaseDate: "2024-01-25",
//     amount: "$75",
//   },
//   {
//     id: 6,
//     name: "Frank Miller",
//     email: "frank@example.com",
//     eventId: 2,
//     event: "Music Festival",
//     ticketType: "VIP",
//     purchaseDate: "2024-02-05",
//     amount: "$200",
//   },
// ]

// interface AttendeesSectionProps {
//   selectedEventId: number | null
// }

// export function AttendeesSection({ selectedEventId }: AttendeesSectionProps) {
//   const filteredAttendees = selectedEventId
//     ? attendees.filter((attendee) => attendee.eventId === selectedEventId)
//     : attendees

//   const selectedEventName = selectedEventId ? attendees.find((a) => a.eventId === selectedEventId)?.event : null

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-xl font-semibold text-gray-900">Attendees</h2>
//           {selectedEventName && (
//             <p className="text-sm text-gray-600 mt-1">
//               Showing attendees for: <span className="font-medium text-teal-600">{selectedEventName}</span>
//             </p>
//           )}
//         </div>
//         <Button variant="outline">
//           <Download className="h-4 w-4 mr-2" />
//           Export List
//         </Button>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>
//             {selectedEventId
//               ? `Event Attendees (${filteredAttendees.length})`
//               : `All Attendees (${filteredAttendees.length})`}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           {selectedEventId && filteredAttendees.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               <p>No attendees found for the selected event.</p>
//               <p className="text-sm mt-1">Select an event from the "My Events" tab to view its attendees.</p>
//             </div>
//           ) : !selectedEventId ? (
//             <div className="text-center py-8 text-gray-500">
//               <p>Select an event from the "My Events" tab to view its attendees.</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {filteredAttendees.map((attendee) => (
//                 <div
//                   key={attendee.id}
//                   className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <Avatar>
//                       <AvatarImage
//                         src={`/abstract-geometric-shapes.png?height=40&width=40&query=${attendee.name} avatar`}
//                       />
//                       <AvatarFallback>
//                         {attendee.name
//                           .split(" ")
//                           .map((n) => n[0])
//                           .join("")}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <div className="font-medium text-gray-900">{attendee.name}</div>
//                       <div className="text-sm text-gray-600">{attendee.email}</div>
//                       {!selectedEventId && <div className="text-sm text-gray-600">{attendee.event}</div>}
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-4">
//                     <div className="text-right">
//                       <Badge variant="secondary">{attendee.ticketType}</Badge>
//                       <div className="text-sm text-gray-600 mt-1">Purchased: {attendee.purchaseDate}</div>
//                       <div className="font-semibold text-gray-900">{attendee.amount}</div>
//                     </div>

//                     <Button variant="outline" size="sm">
//                       <Mail className="h-4 w-4 mr-1" />
//                       Contact
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }





// import { Card, CardContent, CardHeader, CardTitle } from "../organizer/ui/card"
// import { Button } from "../organizer/ui/button"
// import { Avatar, AvatarFallback, AvatarImage } from "../organizer/ui/avatar"
// import { Mail, Download } from "lucide-react"
// import { useAttendeeStore } from "../../store/attendeeStore"
// import { useEventStore } from "../../store/eventStore"

// interface AttendeesSectionProps {
//   selectedEventId: string | null
// }

// export function AttendeesSection({ selectedEventId }: AttendeesSectionProps) {
//   const { attendees } = useAttendeeStore()
//   const { events } = useEventStore()

//   // Filter attendees based on selected event
//   const filteredAttendees = selectedEventId
//     ? attendees.filter((attendee) => attendee.eventId === selectedEventId)
//     : attendees

//   // Get selected event name
//   const selectedEventName = selectedEventId 
//     ? events.find((event) => event._id === selectedEventId)?.title 
//     : null

//   // Format date for display
//   const formatDate = (dateString: string): string => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     })
//   }

//   // Handle export functionality
//   const handleExport = () => {
//     const csvContent = [
//       // Header
//       ['Name', 'Email', 'Event', 'Amount', 'Purchase Date'].join(','),
//       // Data rows
//       ...filteredAttendees.map(attendee => [
//         attendee.name,
//         attendee.email,
//         attendee.event,
//         attendee.amount,
//         formatDate(attendee.purchaseDate)
//       ].join(','))
//     ].join('\n')

//     const blob = new Blob([csvContent], { type: 'text/csv' })
//     const url = window.URL.createObjectURL(blob)
//     const a = document.createElement('a')
//     a.href = url
//     a.download = selectedEventName 
//       ? `${selectedEventName.replace(/\s+/g, '_')}_attendees.csv`
//       : 'all_attendees.csv'
//     document.body.appendChild(a)
//     a.click()
//     document.body.removeChild(a)
//     window.URL.revokeObjectURL(url)
//   }

//   // Handle contact functionality
//   const handleContact = (email: string) => {
//     window.location.href = `mailto:${email}`
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-xl font-semibold text-gray-900">Attendees</h2>
//           {selectedEventName && (
//             <p className="text-sm text-gray-600 mt-1">
//               Showing attendees for: <span className="font-medium text-teal-600">{selectedEventName}</span>
//             </p>
//           )}
//         </div>
//         {filteredAttendees.length > 0 && (
//           <Button variant="outline" onClick={handleExport}>
//             <Download className="h-4 w-4 mr-2" />
//             Export List
//           </Button>
//         )}
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>
//             {selectedEventId
//               ? `Event Attendees (${filteredAttendees.length})`
//               : `All Attendees (${filteredAttendees.length})`}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           {selectedEventId && filteredAttendees.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               <p>No attendees found for the selected event.</p>
//               <p className="text-sm mt-1">Attendees will appear here once they register for this event.</p>
//             </div>
//           ) : !selectedEventId ? (
//             <div className="text-center py-8 text-gray-500">
//               <p>Select an event from the "My Events" tab to view its attendees.</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {filteredAttendees.map((attendee) => (
//                 <div
//                   key={attendee.id}
//                   className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <Avatar>
//                       <AvatarImage
//                         src={`https://api.dicebear.com/7.x/initials/svg?seed=${attendee.name}`}
//                         alt={`${attendee.name} avatar`}
//                       />
//                       <AvatarFallback className="bg-teal-100 text-teal-700">
//                         {attendee.name
//                           .split(" ")
//                           .map((n) => n[0])
//                           .join("")
//                           .toUpperCase()}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <div className="font-medium text-gray-900">{attendee.name}</div>
//                       <div className="text-sm text-gray-600">{attendee.email}</div>
//                       {!selectedEventId && attendee.event && (
//                         <div className="text-sm text-gray-600">{attendee.event}</div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-4">
//                     <div className="text-right">
//                       <div className="text-sm text-gray-600">
//                         Purchased: {formatDate(attendee.purchaseDate)}
//                       </div>
//                       <div className="font-semibold text-gray-900">
//                         ${attendee.amount}
//                       </div>
//                     </div>

//                     <Button 
//                       variant="outline" 
//                       size="sm"
//                       onClick={() => handleContact(attendee.email)}
//                       className="hover:bg-teal-50 hover:border-teal-300"
//                     >
//                       <Mail className="h-4 w-4 mr-1" />
//                       Contact
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }









import { Card, CardContent, CardHeader, CardTitle } from "../organizer/ui/card"
import { Button } from "../organizer/ui/button"
import { Badge } from "../organizer/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../organizer/ui/avatar"
import { Mail, Download } from "lucide-react"
import { useAttendeeStore } from "../../store/attendeeStore" // adjust path
import { formatDateTime } from "../../utils/dateFormatter"

interface AttendeesSectionProps {
  selectedEventId: string | null
}

export function AttendeesSection({ selectedEventId }: AttendeesSectionProps) {
  const attendees = useAttendeeStore((state) => state.attendees)

  const filteredAttendees = selectedEventId
    ? attendees.filter((attendee) => attendee.eventId === selectedEventId)
    : attendees

  const selectedEventName = selectedEventId
    ? attendees.find((a) => a.eventId === selectedEventId)?.event
    : null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Attendees</h2>
          {selectedEventName && (
            <p className="text-sm text-gray-600 mt-1">
              Showing attendees for:{" "}
              <span className="font-medium text-teal-600">{selectedEventName}</span>
            </p>
          )}
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export List
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {selectedEventId
              ? `Event Attendees (${filteredAttendees.length})`
              : `All Attendees (${filteredAttendees.length})`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedEventId && filteredAttendees.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No attendees found for the selected event.</p>
              <p className="text-sm mt-1">Select an event from the "My Events" tab to view its attendees.</p>
            </div>
          ) : !selectedEventId && attendees.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No attendees found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAttendees.map((attendee) => (
                <div
                  key={attendee.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={`/abstract-geometric-shapes.png?height=40&width=40&query=${attendee.name} avatar`}
                      />
                      <AvatarFallback>
                        {attendee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900">{attendee.name}</div>
                      <div className="text-sm text-gray-600">{attendee.email}</div>
                      {!selectedEventId && (
                        <div className="text-sm text-gray-600">{attendee.event}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge variant="secondary">{attendee.event}</Badge>
                      <div className="text-sm text-gray-600 mt-1">Purchased: {formatDateTime(attendee.purchaseDate)}
</div>
                      <div className="font-semibold text-gray-900">{attendee.amount}</div>
                    </div>

                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
