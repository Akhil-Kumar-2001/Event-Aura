import { IEventDto } from "../../../dtos/event/eventDto";
import { ITicketDto } from "../../../dtos/ticket/ticketDto";
import { ITicket } from "../../../model/ticketModel";
import { ICreateTicket, IRazorpayOrder } from "../../../Types/IBasicType";

interface IUserService {
    getEvents(): Promise<IEventDto[]>;
    purchaseTicket(data: ICreateTicket): Promise<ITicket>;
    createRazorpayOrder(amount: number,eventId:string,userId:string): Promise<IRazorpayOrder>;
    confirmPayment(data: ICreateTicket): Promise<ITicket>;
    getTickets(userId: string): Promise<ITicketDto[]>;
    cancelTicket(id:string,userId: string): Promise<boolean>;
}

export default IUserService;
