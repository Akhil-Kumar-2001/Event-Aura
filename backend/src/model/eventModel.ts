

import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IEvent extends Document {
  organizerId: Types.ObjectId;  
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
}

const EventSchema: Schema<IEvent> = new Schema(
  {
    organizerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Organizer is required"]
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
      trim: true
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required']
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
      trim: true
    },
    endTime: {
      type: String,
      required: [true, 'End time is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    ticketCount: {
      type: Number,
      required: [true, 'Ticket count is required'],
      min: [0, 'Ticket count cannot be negative']
    },
    ticketPrice: {
      type: Number,
      required: [true, 'Ticket price is required'],
      min: [0, 'Ticket price cannot be negative']
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    coverImage: {
      type: String,
      required: [true, 'Cover image is required']
    }
  },
  {
    timestamps: true
  }
);

const Event: Model<IEvent> = mongoose.model<IEvent>('Event', EventSchema);

export default Event;
