export type ISignUpData = {
  username?: string;
  email: string;
  password: string;
};


export interface IEvent {
  _id: string
  title: string
  venue: string
  address: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  description: string
  ticketCount: number
  ticketPrice: number
  coverImage: string
  organizerId: string
  createdAt: string
  updatedAt: string
}

export interface EventFormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement
  venue: HTMLInputElement
  description: HTMLTextAreaElement
  address: HTMLInputElement
  startDate: HTMLInputElement
  endDate: HTMLInputElement
  startTime: HTMLInputElement
  endTime: HTMLInputElement
  ticketPrice: HTMLInputElement
  ticketCount: HTMLInputElement
}


export  interface TicketData {
  id: string
  eventId: string
  eventTitle: string
  eventVenue: string
  eventDate: string
  eventTime: string
  eventAddress: string
  price: number
  purchaseDate: string
  quantity: number
  status: "confirmed" | "cancelled"
  ticketNumber: string
}

export interface IAttendee {
  id: string;
  name: string;
  email: string;
  event: string;
  eventId: string;
  amount: string;
  purchaseDate: string;
}