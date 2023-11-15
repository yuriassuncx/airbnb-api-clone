import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Reservation } from '../../../application/entities/reservation';

export class CreateReservationBody implements Omit<Reservation, 'createdAt'> {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  listingId: string;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;
}
