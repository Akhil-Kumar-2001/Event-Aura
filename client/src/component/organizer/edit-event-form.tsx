// import type React from "react"

// import { Card, CardContent, CardHeader, CardTitle } from "../organizer/ui/card"
// import { Button } from "../organizer/ui/button"
// import { Input } from "../organizer/ui/input"
// import { Label } from "../organizer/ui/label"
// import { Textarea } from "./ui/textarea"
// import { X, Upload } from "lucide-react"
// import { useState } from "react"
// import type { IEvent } from "../../Types/basicTypes"


// interface EditEventFormProps {
//   event: IEvent
//   onClose: () => void
//   onSave: (event: IEvent) => void
// }

// export function EditEventForm({ event, onClose, onSave }: EditEventFormProps) {
//   const [selectedImage, setSelectedImage] = useState<File | null>(null)
//   const [imagePreview, setImagePreview] = useState<string | null>(null)

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setSelectedImage(file)
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         setImagePreview(e.target?.result as string)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const formData = new FormData()

//     const form = e.target as HTMLFormElement
//     const formElements = form.elements as any

//     const startDate = new Date(`${formElements.startDate.value}T${formElements.startTime.value}`)
//     const endDate = new Date(`${formElements.endDate.value}T${formElements.endTime.value}`)

//     // Add event ID for update operation
//     formData.append("id", event._id)
//     formData.append("title", formElements.title.value)
//     formData.append("venue", formElements.venue.value)
//     formData.append("description", formElements.description.value)
//     formData.append("address", formElements.address.value)
//     formData.append("startDate", startDate.toISOString())
//     formData.append("endDate", endDate.toISOString())
//     formData.append("startTime", formElements.startTime.value)
//     formData.append("endTime", formElements.endTime.value)
//     formData.append("ticketPrice", formElements.ticketPrice.value)
//     formData.append("ticketCount", formElements.ticketCount.value)

//     // Add image if selected
//     if (selectedImage) {
//       formData.append("coverImage", selectedImage)
//     }

//     try {
//       const response = await fetch(`/api/events/${event._id}`, {
//         method: "PUT",
//         body: formData, // FormData automatically sets correct Content-Type
//       })

//       if (response.ok) {
//         console.log("[v0] Event updated successfully")

//         // Update local state for immediate UI feedback
//         const updatedEvent: IEvent = {
//           ...event,
//           title: formElements.title.value,
//           venue: formElements.venue.value,
//           description: formElements.description.value,
//           address: formElements.address.value,
//           startDate: startDate.toISOString(),
//           endDate: endDate.toISOString(),
//           startTime: formElements.startTime.value,
//           endTime: formElements.endTime.value,
//           ticketPrice: Number.parseFloat(formElements.ticketPrice.value),
//           ticketCount: Number.parseInt(formElements.ticketCount.value),
//           updatedAt: new Date().toISOString(),
//         }

//         onSave(updatedEvent)
//         onClose()
//       } else {
//         console.error("[v0] Failed to update event")
//       }
//     } catch (error) {
//       console.error("[v0] Error updating event:", error)
//     }
//   }

//   // Helper function to format date for input
//   const formatDateForInput = (dateString: string): string => {
//     const date = new Date(dateString)
//     return date.toISOString().split('T')[0]
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//       <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <CardTitle>Edit Event</CardTitle>
//             <Button variant="ghost" size="sm" onClick={onClose}>
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <form onSubmit={handleSubmit}>
//             <div className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="title">Event Title</Label>
//                   <Input id="title" name="title" defaultValue={event.title} required />
//                 </div>

//                 <div>
//                   <Label htmlFor="venue">Venue</Label>
//                   <Input id="venue" name="venue" defaultValue={event.venue} required />
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="description">Description</Label>
//                 <Textarea
//                   id="description"
//                   name="description"
//                   defaultValue={event.description || ""}
//                   placeholder="Describe your event"
//                   rows={3}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="address">Address</Label>
//                 <Input id="address" name="address" defaultValue={event.address} required />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="startDate">Start Date</Label>
//                   <Input 
//                     id="startDate" 
//                     name="startDate" 
//                     type="date" 
//                     defaultValue={formatDateForInput(event.startDate)} 
//                     required 
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="endDate">End Date</Label>
//                   <Input 
//                     id="endDate" 
//                     name="endDate" 
//                     type="date" 
//                     defaultValue={formatDateForInput(event.endDate)} 
//                     required 
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="startTime">Start Time</Label>
//                   <Input id="startTime" name="startTime" type="time" defaultValue={event.startTime} required />
//                 </div>

//                 <div>
//                   <Label htmlFor="endTime">End Time</Label>
//                   <Input id="endTime" name="endTime" type="time" defaultValue={event.endTime} required />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="ticketPrice">Ticket Price ($)</Label>
//                   <Input
//                     id="ticketPrice"
//                     name="ticketPrice"
//                     type="number"
//                     min="0"
//                     step="0.01"
//                     defaultValue={event.ticketPrice || 0}
//                     placeholder="0.00"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="ticketCount">Available Tickets</Label>
//                   <Input
//                     id="ticketCount"
//                     name="ticketCount"
//                     type="number"
//                     min="1"
//                     defaultValue={event.ticketCount || 100}
//                     placeholder="100"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="coverImage">Update Cover Image</Label>
//                 <div className="mt-2">
//                   {imagePreview ? (
//                     <div className="relative">
//                       <img
//                         src={imagePreview}
//                         alt="Preview"
//                         className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
//                       />
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         className="absolute top-2 right-2 bg-white"
//                         onClick={() => {
//                           setSelectedImage(null)
//                           setImagePreview(null)
//                         }}
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ) : event.coverImage ? (
//                     <div className="relative">
//                       <img
//                         src={event.coverImage}
//                         alt="Current cover"
//                         className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
//                       />
//                       <label
//                         htmlFor="coverImage"
//                         className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-lg"
//                       >
//                         <div className="text-white text-center">
//                           <Upload className="h-8 w-8 mx-auto mb-2" />
//                           <p className="text-sm">Click to change image</p>
//                         </div>
//                       </label>
//                     </div>
//                   ) : (
//                     <label
//                       htmlFor="coverImage"
//                       className="cursor-pointer block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-400 transition-colors"
//                     >
//                       <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
//                       <p className="text-sm text-gray-600">Click to upload new image</p>
//                       <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//                     </label>
//                   )}
//                   <Input
//                     id="coverImage"
//                     name="coverImage"
//                     type="file"
//                     className="hidden"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                   />
//                 </div>
//               </div>

//               <div className="flex space-x-2 pt-4">
//                 <Button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700">
//                   Save Changes
//                 </Button>
//                 <Button type="button" variant="outline" onClick={onClose}>
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }










// import type React from "react"

// import { Card, CardContent, CardHeader, CardTitle } from "../organizer/ui/card"
// import { Button } from "../organizer/ui/button"
// import { Input } from "../organizer/ui/input"
// import { Label } from "../organizer/ui/label"
// import { Textarea } from "./ui/textarea"
// import { X, Loader2, AlertCircle } from "lucide-react"
// import { useState } from "react"
// import type { IEvent, EventFormElements } from "../../Types/basicTypes"
// import { useEventFormValidation } from "../../hook/useEventFormValidation"
// import { toast } from "react-toastify"
// import { updateEvent } from "../../service/organizer/organizerApi"

// interface EditEventFormProps {
//   event: IEvent
//   onClose: () => void
//   onSave: (event: IEvent) => void
// }

// // Error message component
// const ErrorMessage = ({ message }: { message?: string }) => {
//   if (!message) return null;
//   return (
//     <div className="flex items-center gap-1 text-red-600 text-sm mt-1 mb-2">
//       <AlertCircle className="h-3 w-3" />
//       <span>{message}</span>
//     </div>
//   );
// };

// export function EditEventForm({ event, onClose, onSave }: EditEventFormProps) {
//   const [isLoading, setIsLoading] = useState(false);
  
//   const {
//     errors,
//     setErrors,
//     validateForm,
//     handleFieldBlur,
//   } = useEventFormValidation();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const form = e.target as HTMLFormElement;
//     const formElements = form.elements as EventFormElements;

//     const validationErrors = validateForm(formElements);
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       setIsLoading(false);
//       toast.error("Please fix all validation errors before submitting");
//       return;
//     }

//     const formData = new FormData();
//     const startDate = new Date(`${formElements.startDate.value}T${formElements.startTime.value}`);
//     const endDate = new Date(`${formElements.endDate.value}T${formElements.endTime.value}`);

//     // Add event ID for update operation
//     formData.append("id", event._id);
//     formData.append("title", formElements.title.value.trim());
//     formData.append("venue", formElements.venue.value.trim());
//     formData.append("description", formElements.description.value.trim());
//     formData.append("address", formElements.address.value.trim());
//     formData.append("startDate", startDate.toISOString());
//     formData.append("endDate", endDate.toISOString());
//     formData.append("startTime", formElements.startTime.value);
//     formData.append("endTime", formElements.endTime.value);
//     formData.append("ticketPrice", formElements.ticketPrice.value);
//     formData.append("ticketCount", formElements.ticketCount.value);

//     try {
//       // const response = await fetch(`/api/events/${event._id}`, {
//       //   method: "PUT",
//       //   body: formData,
//       // });
//       const response = await updateEvent(formData);
//       if (response && response.success) {
//         toast.success("Event updated successfully!");

//         // Update local state for immediate UI feedback
//         const updatedEvent: IEvent = {
//           ...event,
//           title: formElements.title.value.trim(),
//           venue: formElements.venue.value.trim(),
//           description: formElements.description.value.trim(),
//           address: formElements.address.value.trim(),
//           startDate: startDate.toISOString(),
//           endDate: endDate.toISOString(),
//           startTime: formElements.startTime.value,
//           endTime: formElements.endTime.value,
//           ticketPrice: Number.parseFloat(formElements.ticketPrice.value),
//           ticketCount: Number.parseInt(formElements.ticketCount.value),
//           updatedAt: new Date().toISOString(),
//         };

//         onSave(updatedEvent);
//         onClose();
//       } else {
//         toast.error("Failed to update event");
//       }
//     } catch (error) {
//       toast.error("Failed to update event");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Helper function to format date for input
//   const formatDateForInput = (dateString: string): string => {
//     const date = new Date(dateString);
//     return date.toISOString().split('T')[0];
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//       <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <CardTitle>Edit Event</CardTitle>
//             <Button variant="ghost" size="sm" onClick={onClose} disabled={isLoading}>
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <form onSubmit={handleSubmit}>
//             <div className="space-y-6">
//               {errors.dateTime && (
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-3">
//                   <ErrorMessage message={errors.dateTime} />
//                 </div>
//               )}

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="title">Event Title</Label>
//                   <ErrorMessage message={errors.title} />
//                   <Input 
//                     id="title" 
//                     name="title" 
//                     defaultValue={event.title} 
//                     required 
//                     disabled={isLoading}
//                     onBlur={handleFieldBlur}
//                     className={errors.title ? 'border-red-500 focus:border-red-500' : ''}
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="venue">Venue</Label>
//                   <ErrorMessage message={errors.venue} />
//                   <Input 
//                     id="venue" 
//                     name="venue" 
//                     defaultValue={event.venue} 
//                     required 
//                     disabled={isLoading}
//                     onBlur={handleFieldBlur}
//                     className={errors.venue ? 'border-red-500 focus:border-red-500' : ''}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="description">Description</Label>
//                 <ErrorMessage message={errors.description} />
//                 <Textarea
//                   id="description"
//                   name="description"
//                   defaultValue={event.description || ""}
//                   placeholder="Describe your event"
//                   rows={3}
//                   required
//                   disabled={isLoading}
//                   onBlur={handleFieldBlur}
//                   className={errors.description ? 'border-red-500 focus:border-red-500' : ''}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="address">Address</Label>
//                 <ErrorMessage message={errors.address} />
//                 <Input 
//                   id="address" 
//                   name="address" 
//                   defaultValue={event.address} 
//                   required 
//                   disabled={isLoading}
//                   onBlur={handleFieldBlur}
//                   className={errors.address ? 'border-red-500 focus:border-red-500' : ''}
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="startDate">Start Date</Label>
//                   <ErrorMessage message={errors.startDate} />
//                   <Input 
//                     id="startDate" 
//                     name="startDate" 
//                     type="date" 
//                     defaultValue={formatDateForInput(event.startDate)} 
//                     required 
//                     disabled={isLoading}
//                     onBlur={handleFieldBlur}
//                     className={errors.startDate ? 'border-red-500 focus:border-red-500' : ''}
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="endDate">End Date</Label>
//                   <ErrorMessage message={errors.endDate} />
//                   <Input 
//                     id="endDate" 
//                     name="endDate" 
//                     type="date" 
//                     defaultValue={formatDateForInput(event.endDate)} 
//                     required 
//                     disabled={isLoading}
//                     onBlur={handleFieldBlur}
//                     className={errors.endDate ? 'border-red-500 focus:border-red-500' : ''}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="startTime">Start Time</Label>
//                   <ErrorMessage message={errors.startTime} />
//                   <Input 
//                     id="startTime" 
//                     name="startTime" 
//                     type="time" 
//                     defaultValue={event.startTime} 
//                     required 
//                     disabled={isLoading}
//                     onBlur={handleFieldBlur}
//                     className={errors.startTime ? 'border-red-500 focus:border-red-500' : ''}
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="endTime">End Time</Label>
//                   <ErrorMessage message={errors.endTime} />
//                   <Input 
//                     id="endTime" 
//                     name="endTime" 
//                     type="time" 
//                     defaultValue={event.endTime} 
//                     required 
//                     disabled={isLoading}
//                     onBlur={handleFieldBlur}
//                     className={errors.endTime ? 'border-red-500 focus:border-red-500' : ''}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="ticketPrice">Ticket Price ($)</Label>
//                   <ErrorMessage message={errors.ticketPrice} />
//                   <Input
//                     id="ticketPrice"
//                     name="ticketPrice"
//                     type="number"
//                     min="0"
//                     step="0.01"
//                     defaultValue={event.ticketPrice || 0}
//                     placeholder="0.00"
//                     required
//                     disabled={isLoading}
//                     onBlur={handleFieldBlur}
//                     className={errors.ticketPrice ? 'border-red-500 focus:border-red-500' : ''}
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="ticketCount">Available Tickets</Label>
//                   <ErrorMessage message={errors.ticketCount} />
//                   <Input
//                     id="ticketCount"
//                     name="ticketCount"
//                     type="number"
//                     min="1"
//                     defaultValue={event.ticketCount || 100}
//                     placeholder="100"
//                     required
//                     disabled={isLoading}
//                     onBlur={handleFieldBlur}
//                     className={errors.ticketCount ? 'border-red-500 focus:border-red-500' : ''}
//                   />
//                 </div>
//               </div>

//               {/* Display current cover image (read-only) */}
//               {event.coverImage && (
//                 <div>
//                   <Label>Current Cover Image</Label>
//                   <div className="mt-2">
//                     <img
//                       src={event.coverImage}
//                       alt="Event cover"
//                       className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
//                     />
//                     <p className="text-xs text-gray-500 mt-2">
//                       Cover image cannot be updated in edit mode
//                     </p>
//                   </div>
//                 </div>
//               )}

//               <div className="flex space-x-2 pt-4">
//                 <Button 
//                   type="submit" 
//                   className="flex-1 bg-teal-600 hover:bg-teal-700" 
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                       Saving Changes...
//                     </>
//                   ) : (
//                     'Save Changes'
//                   )}
//                 </Button>
//                 <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }







import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../organizer/ui/card";
import { Button } from "../organizer/ui/button";
import { Input } from "../organizer/ui/input";
import { Label } from "../organizer/ui/label";
import { Textarea } from "./ui/textarea";
import { X, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import type { IEvent, EventFormElements } from "../../Types/basicTypes";
import { useEventFormValidation } from "../../hook/useEventFormValidation";
import { toast } from "react-toastify";
import { updateEvent } from "../../service/organizer/organizerApi";

// Error message component
const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-1 text-red-600 text-sm mt-1 mb-2">
      <AlertCircle className="h-3 w-3" />
      <span>{message}</span>
    </div>
  );
};

interface EditEventFormProps {
  event: IEvent;
  onClose: () => void;
  onSave: (event: IEvent) => void;
}

export function EditEventForm({ event, onClose, onSave }: EditEventFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    errors,
    setErrors,
    validateForm,
    handleFieldBlur,
  } = useEventFormValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const formElements = form.elements as EventFormElements;

    const validationErrors = validateForm(formElements);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      toast.error("Please fix all validation errors before submitting");
      return;
    }

    const formData = new FormData();
    const startDate = new Date(`${formElements.startDate.value}T${formElements.startTime.value}`);
    const endDate = new Date(`${formElements.endDate.value}T${formElements.endTime.value}`);

    // Add event data to FormData (excluding id, which is passed as URL parameter)
    formData.append("organizerId", event.organizerId.toString()); // Ensure organizerId is included
    formData.append("title", formElements.title.value.trim());
    formData.append("venue", formElements.venue.value.trim());
    formData.append("description", formElements.description.value.trim());
    formData.append("address", formElements.address.value.trim());
    formData.append("startDate", startDate.toISOString());
    formData.append("endDate", endDate.toISOString());
    formData.append("startTime", formElements.startTime.value);
    formData.append("endTime", formElements.endTime.value);
    formData.append("ticketPrice", formElements.ticketPrice.value);
    formData.append("ticketCount", formElements.ticketCount.value);

    try {
      const response = await updateEvent(event._id, formData);
      if (response && response.success) {
        toast.success("Event updated successfully!");

        // Update local state for immediate UI feedback
        const updatedEvent: IEvent = {
          ...event,
          title: formElements.title.value.trim(),
          venue: formElements.venue.value.trim(),
          description: formElements.description.value.trim(),
          address: formElements.address.value.trim(),
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          startTime: formElements.startTime.value,
          endTime: formElements.endTime.value,
          ticketPrice: Number.parseFloat(formElements.ticketPrice.value),
          ticketCount: Number.parseInt(formElements.ticketCount.value),
          updatedAt: new Date().toISOString(),
        };

        onSave(updatedEvent);
        onClose();
      } else {
        toast.error(response?.message || "Failed to update event");
      }
    } catch (error) {
      toast.error("Error updating event");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to format date for input
  const formatDateForInput = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Edit Event</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} disabled={isLoading}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {errors.dateTime && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <ErrorMessage message={errors.dateTime} />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Event Title</Label>
                  <ErrorMessage message={errors.title} />
                  <Input 
                    id="title" 
                    name="title" 
                    defaultValue={event.title} 
                    required 
                    disabled={isLoading}
                    onBlur={handleFieldBlur}
                    className={errors.title ? 'border-red-500 focus:border-red-500' : ''}
                  />
                </div>

                <div>
                  <Label htmlFor="venue">Venue</Label>
                  <ErrorMessage message={errors.venue} />
                  <Input 
                    id="venue" 
                    name="venue" 
                    defaultValue={event.venue} 
                    required 
                    disabled={isLoading}
                    onBlur={handleFieldBlur}
                    className={errors.venue ? 'border-red-500 focus:border-red-500' : ''}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <ErrorMessage message={errors.description} />
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={event.description || ""}
                  placeholder="Describe your event"
                  rows={3}
                  required
                  disabled={isLoading}
                  onBlur={handleFieldBlur}
                  className={errors.description ? 'border-red-500 focus:border-red-500' : ''}
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <ErrorMessage message={errors.address} />
                <Input 
                  id="address" 
                  name="address" 
                  defaultValue={event.address} 
                  required 
                  disabled={isLoading}
                  onBlur={handleFieldBlur}
                  className={errors.address ? 'border-red-500 focus:border-red-500' : ''}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <ErrorMessage message={errors.startDate} />
                  <Input 
                    id="startDate" 
                    name="startDate" 
                    type="date" 
                    defaultValue={formatDateForInput(event.startDate)} 
                    required 
                    disabled={isLoading}
                    onBlur={handleFieldBlur}
                    className={errors.startDate ? 'border-red-500 focus:border-red-500' : ''}
                  />
                </div>

                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <ErrorMessage message={errors.endDate} />
                  <Input 
                    id="endDate" 
                    name="endDate" 
                    type="date" 
                    defaultValue={formatDateForInput(event.endDate)} 
                    required 
                    disabled={isLoading}
                    onBlur={handleFieldBlur}
                    className={errors.endDate ? 'border-red-500 focus:border-red-500' : ''}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <ErrorMessage message={errors.startTime} />
                  <Input 
                    id="startTime" 
                    name="startTime" 
                    type="time" 
                    defaultValue={event.startTime} 
                    required 
                    disabled={isLoading}
                    onBlur={handleFieldBlur}
                    className={errors.startTime ? 'border-red-500 focus:border-red-500' : ''}
                  />
                </div>

                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <ErrorMessage message={errors.endTime} />
                  <Input 
                    id="endTime" 
                    name="endTime" 
                    type="time" 
                    defaultValue={event.endTime} 
                    required 
                    disabled={isLoading}
                    onBlur={handleFieldBlur}
                    className={errors.endTime ? 'border-red-500 focus:border-red-500' : ''}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ticketPrice">Ticket Price ($)</Label>
                  <ErrorMessage message={errors.ticketPrice} />
                  <Input
                    id="ticketPrice"
                    name="ticketPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue={event.ticketPrice || 0}
                    placeholder="0.00"
                    required
                    disabled={isLoading}
                    onBlur={handleFieldBlur}
                    className={errors.ticketPrice ? 'border-red-500 focus:border-red-500' : ''}
                  />
                </div>

                <div>
                  <Label htmlFor="ticketCount">Available Tickets</Label>
                  <ErrorMessage message={errors.ticketCount} />
                  <Input
                    id="ticketCount"
                    name="ticketCount"
                    type="number"
                    min="1"
                    defaultValue={event.ticketCount || 100}
                    placeholder="100"
                    required
                    disabled={isLoading}
                    onBlur={handleFieldBlur}
                    className={errors.ticketCount ? 'border-red-500 focus:border-red-500' : ''}
                  />
                </div>
              </div>

              {/* Display current cover image (read-only) */}
              {event.coverImage && (
                <div>
                  <Label>Current Cover Image</Label>
                  <div className="mt-2">
                    <img
                      src={event.coverImage}
                      alt="Event cover"
                      className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Cover image cannot be updated in edit mode
                    </p>
                  </div>
                </div>
              )}

              <div className="flex space-x-2 pt-4">
                <Button 
                  type="submit" 
                  className="flex-1 bg-teal-600 hover:bg-teal-700" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Saving Changes...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}