export interface IEventDto {
  _id?: string;
  organizerId?: string;
  venue?: string;
  address?: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  description?: string;
  ticketCount?: number;
  ticketPrice?: number;
  title?: string;
  coverImage?: string;
  createdAt?: string;
  updatedAt?: string;
}
