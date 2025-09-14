import { Request, Response } from "express";


interface IOrganizerController {
    createEvent(req: Request, res: Response): Promise<void>;
    editEvent(req: Request, res: Response): Promise<void>;
    getEvents(req: Request, res: Response): Promise<void>;
    deleteEvent(req: Request, res: Response): Promise<void>;
    getAttendees(req: Request, res: Response): Promise<void>;

}
export default IOrganizerController;