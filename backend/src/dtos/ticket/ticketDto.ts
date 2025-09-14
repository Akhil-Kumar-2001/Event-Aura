export interface ITicketDto {
  id: string;
  eventId: string;
  eventTitle: string;
  eventVenue: string;
  eventDate: Date | null;     
  eventTime: string;
  eventAddress: string;
  price: number;
  quantity:number;
  purchaseDate: Date | null;  
  status: string;
  ticketNumber: string;
}
