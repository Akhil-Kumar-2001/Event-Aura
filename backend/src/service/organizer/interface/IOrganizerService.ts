import { IEventDto } from "../../../dtos/event/eventDto";
import { IAttendeeResponse, IEventCreation, IEventUpdation } from "../../../Types/IBasicType";

interface IOrganizerService{
    createEvent(data:IEventCreation):Promise<IEventDto>;
    updateEvent(id:string,data:IEventUpdation):Promise<boolean>;
    getEvents(organizerId:string):Promise<IEventDto[]>;
    deleteEvent(eventId:string):Promise<boolean>;
    getAttendees(eventId:string):Promise<IAttendeeResponse[] | null>;
}

export default IOrganizerService;