import { CreateReservationBody } from '../../infra/http/dtos/create-reservation-body';
import { Reservation } from '../entities/reservation';

export abstract class ReservationsRepository {
  abstract create(reservation: CreateReservationBody): Promise<void>;
  abstract findMany(): Promise<Reservation[] | null>;
  abstract findById(reservationId: string): Promise<Reservation | null>;
  abstract findByUserId(userId: string): Promise<Reservation[] | null>;
  abstract update(
    reservationId: string,
    reservation: Partial<Reservation>,
  ): Promise<Reservation>;
  abstract delete(userId: string, reservationId: string): Promise<void>;
}
