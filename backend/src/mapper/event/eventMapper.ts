// src/mappers/event/eventMapper.ts
import { IEvent } from '../../model/eventModel';
import { IEventDto } from '../../dtos/event/eventDto';

export const mapEventToDto = (event: IEvent): IEventDto => {
  return {
    _id: event._id ? event._id.toString() : '',
    organizerId: event.organizerId ? event.organizerId.toString() : '',
    venue: event.venue,
    address: event.address,
    startDate: event.startDate ? event.startDate.toISOString() : '',
    endDate: event.endDate ? event.endDate.toISOString() : '',
    startTime: event.startTime,
    endTime: event.endTime,
    description: event.description,
    ticketCount: event.ticketCount,
    ticketPrice: event.ticketPrice,
    title: event.title,
    coverImage: event.coverImage,
    createdAt: event.createdAt ? event.createdAt.toISOString() : '',
    updatedAt: event.updatedAt ? event.updatedAt.toISOString() : ''
  };
};

export const mapEventsToDto = (events: IEvent[]): IEventDto[] => {
  return events.map(mapEventToDto);
};
