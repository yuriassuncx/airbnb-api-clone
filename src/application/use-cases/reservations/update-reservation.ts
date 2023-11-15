import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from '../../repositories/reservations-repository';
import { UpdateReservationBody } from '../../../infra/http/dtos/update-reservation-body';
import { Reservation } from '../../entities/reservation';

@Injectable()
export class UpdateReservation {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  async execute(
    reservationId: string,
    body: UpdateReservationBody,
  ): Promise<Reservation> {
    const reservation = await this.reservationsRepository.update(
      reservationId,
      body,
    );
    return reservation;
  }
}
