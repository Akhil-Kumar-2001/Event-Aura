import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { IEventResponse } from "../Types/IBasicType";

// Interface for Ticket document
export interface ITicket extends Document {
  _id: Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  eventId: mongoose.Types.ObjectId;
  status: "confirmed" | "cancelled";
  price: number;
  quantity: number;
  paymentId?: string; 
  createdAt: Date;
  updatedAt: Date;
}

export interface ITicketExpanded extends Omit<ITicket, "eventId">{
  eventId: IEventResponse
}

// Define the Ticket schema
const TicketSchema: Schema<ITicket> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    paymentId: {
      type: String, // Store Razorpay payment ID here
      required: false,
    },
  },
  { timestamps: true }
);

const Ticket: Model<ITicket> = mongoose.model<ITicket>("Ticket", TicketSchema);

export default Ticket;
