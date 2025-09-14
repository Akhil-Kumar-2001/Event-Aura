import { da } from "zod/v4/locales";
import IOrganizerService from "../../../service/organizer/interface/IOrganizerService";
import { IEventCreation, IEventUpdation } from "../../../Types/IBasicType";
import IOrganizerController from "../interface/IOrganizerController";
import { Request, Response } from "express";
import { AppError } from "../../../utils/customError";
import { STATUS_CODES } from "../../../constants/statusCode";
import { ZodError } from "zod";


class OrganizerController implements IOrganizerController {
    private _organizerService: IOrganizerService;
    constructor(organizerService: IOrganizerService) {
        this._organizerService = organizerService;
    }

    async createEvent(req: Request, res: Response): Promise<void> {
        try {
            let organizerId = req.userId as string;
            if (!organizerId) {
                res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Organizer ID is required" });
                return;
            }
            const { title, venue, address, startDate, endDate, startTime, endTime, description, ticketPrice, ticketCount } = req.body;
            const coverImage = req.file


            if (!title || !venue || !address || !startDate || !endDate || !startTime || !endTime || !description || !coverImage || !ticketPrice || !ticketCount || !organizerId || ticketCount <= 0 || ticketPrice < 0) {
                res.status(STATUS_CODES.BAD_REQUEST).json({ message: "All fields are required" });
                return;
            }

            const data = {
                organizerId,
                title,
                venue,
                address,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                startTime,
                endTime,
                description,
                ticketCount,
                ticketPrice,
                coverImage
            };


            const event = await this._organizerService.createEvent(data as IEventCreation);
            res.status(STATUS_CODES.CREATED).json({ success: true, message: "Event created successfully", data: event });

        } catch (error: unknown) {
            if (error instanceof ZodError) {

                res.status(STATUS_CODES.BAD_REQUEST).json({
                    success: false,
                    message: error.issues[0]?.message || "Validation error"
                });
                return;
            }


            const statusCode = error instanceof AppError ? error.statusCode : 500;
            const message = error instanceof AppError ? error.message : "Internal server error";

            res.status(statusCode).json({
                success: false,
                message,
            });
        }
    }

    async editEvent(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id ;

            const { title, venue, address, startDate, endDate, startTime, endTime, description, ticketPrice, ticketCount } = req.body;

            if (!id || !title || !venue || !address || !startDate || !endDate || !startTime || !endTime || !description || !ticketPrice || !ticketCount  || ticketCount <= 0 || ticketPrice < 0) {
                res.status(STATUS_CODES.BAD_REQUEST).json({ message: "All fields are required" });
                return;
            }

            const data = {
                title,
                venue,
                address,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                startTime,
                endTime,
                description,
                ticketCount,
                ticketPrice,
            };


            const event = await this._organizerService.updateEvent(id,data as IEventUpdation);
            res.status(STATUS_CODES.CREATED).json({ success: true, message: "Event created successfully", data: event });

        } catch (error: unknown) {
            if (error instanceof ZodError) {

                res.status(STATUS_CODES.BAD_REQUEST).json({
                    success: false,
                    message: error.issues[0]?.message || "Validation error"
                });
                return;
            }


            const statusCode = error instanceof AppError ? error.statusCode : 500;
            const message = error instanceof AppError ? error.message : "Internal server error";

            res.status(statusCode).json({
                success: false,
                message,
            });
        }
    }

    async getEvents(req: Request, res: Response): Promise<void> {
        try {
            const organizerId = req.userId as string;
            if (!organizerId) {
                res.status(STATUS_CODES.BAD_REQUEST).json({ success: false, message: "Organizer ID is required" });
                return;
            }
            const events = await this._organizerService.getEvents(organizerId);
            res.status(STATUS_CODES.OK).json({ success: true, data: events });
        } catch (error: unknown) {
            const statusCode = error instanceof AppError ? error.statusCode : 500;
            const message = error instanceof AppError ? error.message : "Internal server error";

            res.status(statusCode).json({
                success: false,
                message,
            });
        }
    }

    async deleteEvent(req: Request, res: Response): Promise<void> {
        try {
            const eventId = req.params.id;
            if (!eventId) {
                res.status(STATUS_CODES.BAD_REQUEST).json({ success: false, message: "Event ID is required" });
                return;
            }

            await this._organizerService.deleteEvent(eventId);
            res.status(STATUS_CODES.OK).json({ success: true, message: "Event deleted successfully" });
        } catch (error: unknown) {
            const statusCode = error instanceof AppError ? error.statusCode : 500;
            const message = error instanceof AppError ? error.message : "Internal server error";

            res.status(statusCode).json({
                success: false,
                message,
            });
        }
    }

    async getAttendees(req: Request, res: Response): Promise<void> {
        try {
            const eventId = req.params.id;
            if (!eventId) {
                res.status(STATUS_CODES.BAD_REQUEST).json({ success: false, message: "Event ID is required" });
                return;
            }

            const attendees = await this._organizerService.getAttendees(eventId);
            res.status(STATUS_CODES.OK).json({ success: true, message: "Attendees list get successfully",data:attendees });
        } catch (error: unknown) {
            const statusCode = error instanceof AppError ? error.statusCode : 500;
            const message = error instanceof AppError ? error.message : "Internal server error";

            res.status(statusCode).json({
                success: false,
                message,
            });
        }
    }
}

export default OrganizerController