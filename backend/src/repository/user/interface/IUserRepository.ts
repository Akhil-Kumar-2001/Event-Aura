import { IEvent } from "../../../model/eventModel";
import { ITicket, ITicketExpanded } from "../../../model/ticketModel";
import { IUser } from "../../../model/userModel";
import { ICreateTicket, IEventResponse, ITicketResponse } from "../../../Types/IBasicType";
import { IBaseRepository } from "../../base/interface/IBaseRepository";

interface IUserRepository extends IBaseRepository<IUser>{
    getEvents():Promise<IEvent[]|null>;
    createTicket(data:ICreateTicket):Promise<ITicket|null>;
    getTicketsByUserId(userId: string):Promise<ITicketExpanded[]|null>;
    cancelTicket(id:string,userId: string):Promise<boolean>;
    findUserTicket(eventId:string,userId: string):Promise<boolean>;
}

export default IUserRepository