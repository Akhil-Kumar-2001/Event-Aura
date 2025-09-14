import { BaseRepository } from "../../base/implementation/BaseRepository";
import IOrganizerRepository from "../interface/IOrganizerRepository";
import Event, { IEvent } from "../../../model/eventModel";
import { IAttendeeResponse, IEventUpdation, TicketWithPopulated } from "../../../Types/IBasicType";
import Ticket from "../../../model/ticketModel";
import mongoose from "mongoose";

class OrganizerRepository extends BaseRepository<IEvent> implements IOrganizerRepository {
    constructor() {
        super(Event)
    }

    async updateEvent(id: string, data: IEventUpdation): Promise<boolean> {
        try {


            const updateData: Partial<IEvent> = {
                venue: data.venue.trim(),
                address: data.address.trim(),
                startDate: data.startDate,
                endDate: data.endDate,
                startTime: data.startTime.trim(),
                endTime: data.endTime.trim(),
                description: data.description.trim(),
                ticketCount: data.ticketCount,
                ticketPrice: data.ticketPrice,
                title: data.title.trim(),
            };

            const updatedEvent = await Event.findByIdAndUpdate(
                id,
                { $set: updateData },
                { new: true, runValidators: true } 
            );

            if (!updatedEvent) {
                throw new Error('Event not found');
            }

            return !!updatedEvent;
        } catch (error) {
            throw new Error(`Failed to update event: ${error}`);
        }
    }

    async getEventsByOrganizer(organizerId: string): Promise<IEvent[] | null> {
        try {
            const events = await Event.find({ organizerId });
            return events;
        } catch (error) {
            console.error("Error fetching events by organizer:", error);
            return null;
        }
    }

    async getAttendees(eventId: string): Promise<IAttendeeResponse[] | null> {
        try {
            const tickets = await Ticket.find({
                eventId,
                status: "confirmed"
            })
                .populate("userId", "username email") // get username & email
                .populate("eventId", "title")         // get event title
                .exec();

            if (!tickets || tickets.length === 0) {
                return [];
            }

            const attendees: IAttendeeResponse[] = (tickets as unknown as TicketWithPopulated[]).map(ticket => ({
                id: ticket.userId._id.toString(),
                name: ticket.userId.username,
                email: ticket.userId.email,
                eventId: ticket.eventId._id.toString(),
                event: ticket.eventId.title,
                purchaseDate: ticket.createdAt,
                amount: `$${ticket.price * ticket.quantity}`,
            }));

            return attendees;

        } catch (error) {
            console.error("Error fetching attendees:", error);
            return null;
        }
    }
}

export default OrganizerRepository