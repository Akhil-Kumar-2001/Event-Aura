// import { Card, CardContent, CardHeader, CardTitle } from "../../component/organizer/ui/card"
// import { Button } from "../../component/organizer/ui/button"
// import { Input } from "../../component/organizer/ui/input"
// import { Label } from "../../component/organizer/ui/label"
// import { Textarea } from "../../component/organizer/ui/textarea"
// import { X, Upload, Loader2 } from "lucide-react"
// import { useState } from "react"
// import { createEvent } from "../../service/organizer/organizerApi"
// import { toast } from "react-toastify"
// import { useEventStore } from "../../store/eventStore"
// import type { EventFormElements } from "../../Types/basicTypes"



// interface CreateEventFormProps {
//   onClose: () => void
// }

// export function CreateEventForm({ onClose }: CreateEventFormProps) {
//   const [selectedImage, setSelectedImage] = useState<File | null>(null)
//   const [imagePreview, setImagePreview] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const { addEvent } = useEventStore.getState()


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
//     setIsLoading(true)

//     const formData = new FormData()

//     const form = e.target as HTMLFormElement
//     const formElements = form.elements as EventFormElements


//     const startDate = new Date(`${formElements.startDate.value}T${formElements.startTime.value}`)
//     const endDate = new Date(`${formElements.endDate.value}T${formElements.endTime.value}`)

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

//     // Add image file if selected
//     if (selectedImage) {
//       formData.append("coverImage", selectedImage)
//     }

//     try {
//       const response = await createEvent(formData);

//       if (response && response.success) {
//         toast.success(response.message || "Event created successfully!")
//         addEvent(response.data)
//         onClose()
//       }
//     } catch (error) {
//       toast.error("Failed to create event")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//       <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <CardTitle>Create New Event</CardTitle>
//             <Button variant="ghost" size="sm" onClick={onClose} disabled={isLoading}>
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
//                   <Input id="title" name="title" placeholder="Enter event title" required disabled={isLoading} />
//                 </div>

//                 <div>
//                   <Label htmlFor="venue">Venue</Label>
//                   <Input id="venue" name="venue" placeholder="Enter venue name" required disabled={isLoading} />
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="description">Description</Label>
//                 <Textarea id="description" name="description" placeholder="Describe your event" rows={3} required disabled={isLoading} />
//               </div>

//               <div>
//                 <Label htmlFor="address">Address</Label>
//                 <Input id="address" name="address" placeholder="Enter full address" required disabled={isLoading} />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="startDate">Start Date</Label>
//                   <Input id="startDate" name="startDate" type="date" required disabled={isLoading} />
//                 </div>

//                 <div>
//                   <Label htmlFor="endDate">End Date</Label>
//                   <Input id="endDate" name="endDate" type="date" required disabled={isLoading} />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="startTime">Start Time</Label>
//                   <Input id="startTime" name="startTime" type="time" required disabled={isLoading} />
//                 </div>

//                 <div>
//                   <Label htmlFor="endTime">End Time</Label>
//                   <Input id="endTime" name="endTime" type="time" required disabled={isLoading} />
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
//                     placeholder="0.00"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="ticketCount">Available Tickets</Label>
//                   <Input id="ticketCount" name="ticketCount" type="number" min="1" placeholder="100" required disabled={isLoading} />
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="coverImage">Cover Image</Label>
//                 <div className="mt-2">
//                   {imagePreview ? (
//                     <div className="relative">
//                       <img
//                         src={imagePreview || "/placeholder.svg"}
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
//                         disabled={isLoading}
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ) : (
//                     <label
//                       htmlFor="coverImage"
//                       className={`cursor-pointer block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-400 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
//                         }`}
//                     >
//                       <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
//                       <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
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
//                     disabled={isLoading}
//                   />
//                 </div>
//               </div>

//               <div className="flex space-x-2 pt-4">
//                 <Button
//                   type="submit"
//                   className="flex-1 bg-teal-600 hover:bg-teal-700"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                       Creating Event...
//                     </>
//                   ) : (
//                     'Create Event'
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






import { Card, CardContent, CardHeader, CardTitle } from "../../component/organizer/ui/card";
import { Button } from "../../component/organizer/ui/button";
import { Input } from "../../component/organizer/ui/input";
import { Label } from "../../component/organizer/ui/label";
import { Textarea } from "../../component/organizer/ui/textarea";
import { X, Upload, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { createEvent } from "../../service/organizer/organizerApi";
import { toast } from "react-toastify";
import { useEventStore } from "../../store/eventStore";
import type { EventFormElements } from "../../Types/basicTypes";
import { useEventFormValidation } from "../../hook/useEventFormValidation";

interface CreateEventFormProps {
  onClose: () => void;
}

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

export function CreateEventForm({ onClose }: CreateEventFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addEvent } = useEventStore.getState();
  const {
    errors,
    selectedImage,
    imagePreview,
    setSelectedImage,
    setImagePreview,
    setErrors,
    validateForm,
    handleFieldBlur,
    handleImageChange,
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

    if (selectedImage) {
      formData.append("coverImage", selectedImage);
    }

    try {
      const response = await createEvent(formData);
      if (response && response.success) {
        toast.success(response.message || "Event created successfully!");
        addEvent(response.data);
        onClose();
      }
    } catch (error) {
      toast.error("Failed to create event");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Create New Event</CardTitle>
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
                    placeholder="Enter event title"
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
                    placeholder="Enter venue name"
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
                  placeholder="Enter full address"
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
                    placeholder="100"
                    required
                    disabled={isLoading}
                    onBlur={handleFieldBlur}
                    className={errors.ticketCount ? 'border-red-500 focus:border-red-500' : ''}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="coverImage">Cover Image</Label>
                <ErrorMessage message={errors.coverImage} />
                <div className="mt-2">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 bg-white"
                        onClick={() => {
                          setSelectedImage(null);
                          setImagePreview(null);
                            setErrors((prevState) => ({ ...prevState, coverImage: undefined }));
                        }}
                        disabled={isLoading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <label
                      htmlFor="coverImage"
                      className={`cursor-pointer block border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        errors.coverImage
                          ? 'border-red-300 hover:border-red-400'
                          : 'border-gray-300 hover:border-teal-400'
                      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </label>
                  )}
                  <Input
                    id="coverImage"
                    name="coverImage"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-teal-600 hover:bg-teal-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Creating Event...
                    </>
                  ) : (
                    'Create Event'
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