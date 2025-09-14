import { BaseRepository } from "../../base/implementation/BaseRepository";
import IUserRepository from "../interface/IUserRepository";
import Event, { IEvent } from "../../../model/eventModel";
import UserModel, { IUser } from "../../../model/userModel";
import Ticket, { ITicket, ITicketExpanded } from "../../../model/ticketModel";
import { ICreateTicket, IEventResponse, ITicketResponse } from "../../../Types/IBasicType";
import { STATUS_CODES } from "../../../constants/statusCode";
import { AppError } from "../../../utils/customError";

class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor() {
        super(UserModel);
    }

    async getEvents(): Promise<IEvent[] | null> {
        try {
            const today = new Date();
            const events = await Event.find({
                $or: [
                    { startDate: { $lte: today }, endDate: { $gte: today } },
                    { startDate: { $gt: today } }
                ]
            });
            return events;
        } catch (error) {
            console.error("Error fetching events:", error);
            return null;
        }
    }

    async createTicket(data: ICreateTicket): Promise<ITicket> {
        try {
            const event = await Event.findById(data.eventId);
            if (!event) {
                throw new AppError("Event not found", STATUS_CODES.NOT_FOUND);
            }

            if (event.ticketCount < data.quantity) {
            }

            const ticket = new Ticket(data);
            await ticket.save();

            event.ticketCount -= data.quantity;
            await event.save();

            return ticket;
        } catch (error) {
            console.error("Error creating ticket:", error);
            if (error instanceof AppError) throw error;
            throw new AppError("Failed to create ticket", STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
    }


    async getTicketsByUserId(userId: string): Promise<ITicketExpanded[] | null> {
        try {
            const tickets = await Ticket.find({ userId })
                .populate("eventId")
                .lean<ITicketExpanded[]>();
            return tickets;
        } catch (error) {
            console.error("Error fetching tickets:", error);
            return null;
        }
    }

    async cancelTicket(id: string, userId: string): Promise<boolean> {
        try {
            const ticket = await Ticket.findOneAndUpdate(
                { _id: id, userId, status: "confirmed" },
                { $set: { status: "cancelled" } },
                { new: true }
            );

            if (!ticket) {
                throw new AppError("Ticket not found or already cancelled", STATUS_CODES.NOT_FOUND);
            }

            await Event.findByIdAndUpdate(ticket.eventId, {
                $inc: { ticketCount: ticket.quantity } 
            });

            return true;
        } catch (error) {
            console.error("Error cancelling ticket:", error);
            if (error instanceof AppError) throw error;
            throw new AppError("Failed to cancel ticket", STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
    }


    async findUserTicket(eventId: string, userId: string): Promise<boolean> {
        try {
            const ticket = await Ticket.findOne({ eventId, userId, status: "confirmed" })
            return !!ticket;
        } catch (error) {
            console.error("Error checking ticket:", error);
            throw new AppError("Failed to check ticket", STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
    }

}

export default UserRepository;
