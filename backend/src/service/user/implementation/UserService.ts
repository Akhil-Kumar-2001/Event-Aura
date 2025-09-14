import { AppError } from "../../../utils/customError";
import { STATUS_CODES } from "../../../constants/statusCode";
import { getSignedImageUrl } from "../../../utils/cloudinaryUtility";
import { mapEventsToDto } from "../../../mapper/event/eventMapper";
import { IEventDto } from "../../../dtos/event/eventDto";
import IUserService from "../interface/IUserService";
import IUserRepository from "../../../repository/user/interface/IUserRepository";
import { ICreateTicket, IRazorpayOrder } from "../../../Types/IBasicType";
import razorpay from "../../../config/razorpay";
import { mapTicketsToDto } from "../../../mapper/ticket/ticketMapper";
import { ITicketDto } from "../../../dtos/ticket/ticketDto";
import { ITicket } from "../../../model/ticketModel";

class UserService implements IUserService {
    private _userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this._userRepository = userRepository;
    }

    async getEvents(): Promise<IEventDto[]> {
        try {
            const events = await this._userRepository.getEvents() ?? [];
            for (let event of events) {
                event.coverImage = getSignedImageUrl(event.coverImage);
            }
            return mapEventsToDto(events);
        } catch (error) {
            throw new AppError("Failed to fetch events", STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
    }

    async purchaseTicket(data: ICreateTicket): Promise<ITicket> {
        try {
            const ticketExist = await this._userRepository.findUserTicket(data.eventId, data.userId);
            if (ticketExist) {
                throw new AppError("Ticket already purchased for this event", STATUS_CODES.CONFLICT);
            }

            const ticket = await this._userRepository.createTicket(data);
            if (!ticket) {
                throw new AppError("Ticket creation failed", STATUS_CODES.INTERNAL_SERVER_ERROR);
            }

            return ticket;
        } catch (error) {
            console.error("Error in purchaseTicket:", error);
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Failed to purchase ticket", STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
    }


    async createRazorpayOrder(amount: number, eventId: string, userId: string): Promise<IRazorpayOrder> {
        try {
            const ticketExist = await this._userRepository.findUserTicket(eventId, userId);
            if (ticketExist) {
                throw new AppError("Ticket already purchased for this event", STATUS_CODES.CONFLICT);
            }
            const options = {
                amount: amount * 100,
                currency: "INR",
                payment_capture: 1
            };
            const order = await razorpay.orders.create(options);
            return order as IRazorpayOrder;
        } catch (error) {
            if (error instanceof AppError) {
                throw error; // Rethrow the original AppError
            }
            throw new AppError("Failed to create order", STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
    }

    async confirmPayment(data: ICreateTicket): Promise<ITicket> {
        try {
            const ticketExist = await this._userRepository.findUserTicket(data.eventId, data.userId);
            if (ticketExist) {
                throw new AppError("Ticket already purchased for this event", STATUS_CODES.CONFLICT);
            }

            const ticket = await this._userRepository.createTicket(data);
            if (!ticket) {
                throw new AppError("Ticket creation failed", STATUS_CODES.INTERNAL_SERVER_ERROR);
            }
            return ticket;
        } catch (error) {
            throw new AppError("Failed to confirm payment", STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
    }

    async getTickets(userId: string): Promise<ITicketDto[]> {
        try {
            const tickets = await this._userRepository.getTicketsByUserId(userId);
            if (!tickets) {
                return [];
            }
            const dto = mapTicketsToDto(tickets);
            return dto;
        } catch (error) {
            throw new AppError("Failed to fetch tickets", STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
    }


    async cancelTicket(id: string, userId: string): Promise<boolean> {
        try {
            const ticket = await this._userRepository.cancelTicket(id, userId);
            return ticket
        } catch (error) {
            throw new AppError("Failed to cancel tickets", STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
    }


}

export default UserService;
