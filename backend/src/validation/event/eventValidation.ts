import { z } from 'zod';

// Custom Number Schema for ticketCount and ticketPrice
const ticketCountSchema = z.string().refine(val => {
  const num = Number(val);
  return !isNaN(num) && Number.isInteger(num) && num > 0;
}, {
  message: 'Ticket count must be a positive integer'
});

const ticketPriceSchema = z.string().refine(val => {
  const num = Number(val);
  return !isNaN(num) && num >= 0;
}, {
  message: 'Ticket price must be a non-negative number'
});

// Schema for image object
const coverImageSchema = z.object({
  fieldname: z.string().min(1),
  originalname: z.string().min(1),
  encoding: z.string().min(1),
  mimetype: z.string().regex(/^image\/(png|jpeg|jpg|webp)$/i, 'Cover image must be PNG, JPEG, JPG, or WEBP'),
  buffer: z.instanceof(Buffer),
  size: z.number().min(1, 'Image size must be greater than 0'),
});

// Main event schema
export const EventValidation = z.object({
  organizerId: z.string().length(24, 'OrganizerId must be a valid 24-character string'),
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  venue: z.string().min(3, 'Venue must be at least 3 characters long'),
  address: z.string().min(10, 'Address must be at least 10 characters long'),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/,'Start time must be in HH:mm 24-hour format'),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/,'End time must be in HH:mm 24-hour format'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  ticketCount: ticketCountSchema,
  ticketPrice: ticketPriceSchema,
  coverImage: coverImageSchema,
}).refine((data) => {
  // Check date order: endDate >= startDate
  return data.endDate >= data.startDate;
}, {
  path: ['endDate'],
  message: 'End date cannot be earlier than start date'
}).refine((data) => {
  // If dates are the same, endTime > startTime
  if (data.startDate.toDateString() === data.endDate.toDateString()) {
    return data.endTime > data.startTime;
  }
  return true;
}, {
  path: ['endTime'],
  message: 'End time must be after start time if the event is on the same day'
});
