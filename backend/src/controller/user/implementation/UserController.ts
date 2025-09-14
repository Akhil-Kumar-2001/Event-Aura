import { Request, Response } from "express";
import { AppError } from "../../../utils/customError";
import { STATUS_CODES } from "../../../constants/statusCode";
import IUserController from "../../user/interface/IUserController";
import IUserService from "../../../service/user/interface/IUserService";

class UserController implements IUserController {
    private _userService: IUserService;
    constructor(userService: IUserService) {
        this._userService = userService;
    }

    async getEvents(req: Request, res: Response): Promise<void> {
        try {
            const events = await this._userService.getEvents();
            res.status(STATUS_CODES.OK).json({ success: true, data: events });
        } catch (error: unknown) {
            const statusCode = error instanceof AppError ? error.statusCode : 500;
            const message = error instanceof AppError ? error.message : "Internal server error";
            res.status(statusCode).json({ success: false, message });
        }
    }

    async purchaseTicket(req: Request, res: Response): Promise<void> {
        try {
            const { data } = req.body;
            const userId = req.userId;
            const ticketData = { ...data, userId };
            const response = await this._userService.purchaseTicket(ticketData);
            res.status(STATUS_CODES.OK).json({ success: true, data: response });
        } catch (error) {
            const statusCode = error instanceof AppError ? error.statusCode : 500;
            const message = error instanceof AppError ? error.message : "Internal server error";
            res.status(statusCode).json({ success: false, message });
        }
    }

    async createRazorpayOrder(req: Request, res: Response): Promise<void> {
        try {
            const { amount, eventId } = req.body;
            const userId = req.userId;
            if (!userId) {
                throw new AppError("User not found", STATUS_CODES.NOT_FOUND);
            }
            if (!eventId) {
                throw new AppError("Event ID not provided", STATUS_CODES.BAD_REQUEST);
            }
            const order = await this._userService.createRazorpayOrder(amount,eventId,userId);
            res.status(STATUS_CODES.OK).json({ success: true, data: order });
        } catch (error) {
            const statusCode = error instanceof AppError ? error.statusCode : 500;
            const message = error instanceof AppError ? error.message : "Internal server error";
            res.status(statusCode).json({ success: false, message });
        }
    }

    async confirmPayment(req: Request, res: Response): Promise<void> {
        try {
            const { eventId, quantity, price, paymentId } = req.body;
            const userId = req.userId;
            if (!userId) {
                throw new AppError("User not found", STATUS_CODES.NOT_FOUND);
            }
            const ticket = await this._userService.confirmPayment({
                userId,
                eventId,
                quantity,
                price,
                paymentId
            });
            res.status(STATUS_CODES.OK).json({ success: true, data: ticket });
        } catch (error) {
            const statusCode = error instanceof AppError ? error.statusCode : 500;
            const message = error instanceof AppError ? error.message : "Internal server error";
            res.status(statusCode).json({ success: false, message });
        }
    }


    async getTickets(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new AppError("User not found", STATUS_CODES.NOT_FOUND);
            }
            const tickets = await this._userService.getTickets(userId);
            res.status(STATUS_CODES.OK).json({ success: true, data: tickets });
        } catch (error) {
            const statusCode = error instanceof AppError ? error.statusCode : 500;
            const message = error instanceof AppError ? error.message : "Internal server error";
            res.status(statusCode).json({ success: false, message });
        }
    }

    async cancelTicket(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.userId;
            const id = req.params.id;
            if (!userId) {
                throw new AppError("User not found", STATUS_CODES.NOT_FOUND);
            }
            if (!id) {
                throw new AppError("Event ID not provided", STATUS_CODES.BAD_REQUEST);
            }
            const response = await this._userService.cancelTicket(id, userId);
            res.status(STATUS_CODES.OK).json({ success: true, data: response, message: "Ticket cancel successfull" });
        } catch (error) {
            const statusCode = error instanceof AppError ? error.statusCode : 500;
            const message = error instanceof AppError ? error.message : "Internal server error";
            res.status(statusCode).json({ success: false, message });
        }
    }
}


export default UserController;
