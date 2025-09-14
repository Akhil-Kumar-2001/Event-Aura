import { Request, Response } from "express";


interface IOrganizerController {
    getEvents(req: Request, res: Response): Promise<void>;
    purchaseTicket(req: Request, res: Response): Promise<void>;
    createRazorpayOrder(req: Request, res: Response): Promise<void>;
    confirmPayment(req: Request, res: Response): Promise<void>;
    getTickets(req: Request, res: Response): Promise<void>;
    cancelTicket(req: Request, res: Response): Promise<void>;

}
export default IOrganizerController;