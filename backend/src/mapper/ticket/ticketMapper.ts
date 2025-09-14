import {ITicketExpanded } from '../../model/ticketModel';
import { ITicketDto } from '../../dtos/ticket/ticketDto';

export const mapTicketToDto = (ticket: ITicketExpanded ): ITicketDto => {
  return {
    id: ticket._id.toString(),
    eventId: ticket.eventId._id.toString(),
    eventTitle: ticket.eventId.title,
    eventVenue: ticket.eventId.venue,
    eventDate: ticket.eventId.startDate, 
    eventTime: ticket.eventId.startTime,
    eventAddress: ticket.eventId.address,
    price: ticket.price,
    quantity:ticket.quantity,
    purchaseDate: ticket.createdAt,      
    status: ticket.status,
    ticketNumber: ticket._id.toString().slice(-6),
  };
};

export const mapTicketsToDto = (tickets: ITicketExpanded[]): ITicketDto[] => {
  return tickets.map(mapTicketToDto);
};
