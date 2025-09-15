import IOrganizerRepository from "../../../repository/organizer/interface/IOrganizerRepository";
import { IAttendeeResponse, IEventCreation, IEventCreationDB, IEventUpdation } from "../../../Types/IBasicType";
import IOrganizerService from "../interface/IOrganizerService";
import { randomUUID } from 'crypto';
import cloudinary from "../../../config/cloudinary";
import { AppError } from "../../../utils/customError";
import { STATUS_CODES } from "../../../constants/statusCode";
import { getSignedImageUrl } from "../../../utils/cloudinaryUtility";
import { mapEventsToDto, mapEventToDto } from "../../../mapper/event/eventMapper";
import { IEventDto } from "../../../dtos/event/eventDto";
import { EventValidation } from "../../../validation/event/eventValidation";

class OrganizerService implements IOrganizerService {
    private _organizerRepository: IOrganizerRepository;

    constructor(organizerRepository: IOrganizerRepository) {
        this._organizerRepository = organizerRepository;
    }

    async createEvent(data: IEventCreation): Promise<IEventDto> {
        const coverImageId = randomUUID();

        EventValidation.safeParse(data)
        const uploadImage = (): Promise<{ url: string; public_id: string }> => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'Event-CoverImages',
                        public_id: coverImageId, // use our generated UUID
                        resource_type: 'image',
                        format: 'png',
                        type: 'authenticated'
                    },
                    (error, result) => {
                        if (error || !result) {
                            reject(new Error('Image upload failed'));
                        } else {
                            resolve({ url: result.secure_url, public_id: result.public_id });
                        }
                    }
                );
                stream.end(data.coverImage.buffer);
            });
        };

        let imageUploadResult;
        try {
            imageUploadResult = await uploadImage();
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            throw new AppError("Image upload failed", STATUS_CODES.INTERNAL_SERVER_ERROR);
        }

        const eventData: IEventCreationDB = {
            ...data,
            coverImage: imageUploadResult.public_id // store the public ID from Cloudinary
        };

        try {
            const event = await this._organizerRepository.create(eventData);
            const dto = mapEventToDto(event)
            return dto;
        } catch (error) {
            throw error
        }
    }

    async updateEvent(id: string, data: IEventUpdation): Promise<boolean> {
        try {
            const event = await this._organizerRepository.updateEvent(id, data);
            if (!event) {
                throw new Error('Event not found');
            }
            return event;
        } catch (error) {
            throw error
        }
    }

    async getEvents(organizerId: string): Promise<IEventDto[]> {
        try {
            const events = await this._organizerRepository.getEventsByOrganizer(organizerId) ?? [];
            for (let event of events) {
                event.coverImage = getSignedImageUrl(event.coverImage)
            }
            let dto = mapEventsToDto(events)
            return dto;
        } catch (error) {
            throw new AppError("Failed to fetch events", STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteEvent(eventId: string): Promise<boolean> {
        try {
            const event = await this._organizerRepository.findById(eventId);
            if (!event) {
                throw new AppError("Event not found", STATUS_CODES.NOT_FOUND);
            }

            await cloudinary.uploader.destroy(event.coverImage, { resource_type: 'image', type: 'authenticated' });

            await this._organizerRepository.delete(eventId);
            return true;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Failed to delete event", STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
    }

    async getAttendees(eventId: string): Promise<IAttendeeResponse[] | null> {
        try {
            const attendees = await this._organizerRepository.getAttendees(eventId);
            return attendees
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Failed to get attendees list", STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
    }
}

export default OrganizerService;
