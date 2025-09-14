import { IEvent } from "../../../model/eventModel";
import { IAttendeeResponse, IEventUpdation } from "../../../Types/IBasicType";
import { IBaseRepository } from "../../base/interface/IBaseRepository";

interface IOrganizerRepository extends IBaseRepository<IEvent>{
    
    updateEvent(id:string,data:IEventUpdation):Promise<boolean|null>;
    getEventsByOrganizer(organizerId:string):Promise<IEvent[]|null>;
    getAttendees(eventId:string):Promise<IAttendeeResponse[] | null>;
}

export default IOrganizerRepository