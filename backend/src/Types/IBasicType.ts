import { IEventDto } from "../dtos/event/eventDto";
import { IUserDto } from "../dtos/user/userDto";
import { IEvent } from "../model/eventModel";
import { ITicket } from "../model/ticketModel";

export interface AuthResponse {
  user: IUserDto;
  accessToken: string;
  refreshToken: string;
};

export interface IEventCreation {
  id?: number; 
  organizerId: string;
  venue: string;
  address: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  description: string;
  ticketCount: number;
  ticketPrice: number;
  title: string;
  coverImage: Express.Multer.File;
}

export interface IEventUpdation {
  venue: string;
  address: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  description: string;
  ticketCount: number;
  ticketPrice: number;
  title: string;
}

export interface IEventCreationDB {
  id?: number; 
  venue: string;
  address: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  description: string;
  ticketCount: number;
  ticketPrice: number;
  title: string;
  coverImage: string;
}


export interface ICreateTicket {
  eventId: string;
  userId: string;
  quantity: number;
  price: number;
  status?: "confirmed" | "cancelled";
  paymentId?:string
}


export interface IEventResponse {
  _id: string;
  organizerId: string;
  venue: string;
  address: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  description: string;
  ticketCount: number;
  ticketPrice: number;
  title: string;
  coverImage: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ITicketResponse {
  _id: string;
  userId: string;
  eventId: IEventResponse;
  status: "confirmed" | "cancelled"; 
  price: number;
  quantity: number;
  paymentId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}


export interface IRazorpayOrder {
  amount: string | number;
  amount_due: string | number;
  amount_paid: string | number;
  attempts: number;
  created_at: string | number;
  currency: string;
  entity: string;
  id: string;
  notes: { [key: string]: string | number };
  offer_id: string | null;
  receipt: string | null;
  status: string;
}



export interface IAttendeeResponse {
  id: string;       
  name: string;       
  email: string;       
  eventId: string;    
  event: string;      
  purchaseDate: Date;
  amount: string;     
}



export interface IUserPopulated {
  _id: string;
  username: string;
  email: string;
}

export interface IEventPopulated {
  _id: string;
  title: string;
}


export type TicketWithPopulated = Omit<ITicket, "userId" | "eventId"> & {
  userId: IUserPopulated;
  eventId: IEventPopulated;
};
