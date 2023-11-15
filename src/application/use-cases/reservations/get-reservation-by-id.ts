import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from '../../../application/repositories/reservations-repository';
import { Reservation } from '../../entities/reservation';

interface GetReservationByIdRequest {
  reservationId: string;
}

@Injectable()
export class GetReservationById {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  async execute(
    request: GetReservationByIdRequest,
  ): Promise<Reservation | null> {
    const { reservationId } = request;

    const reservation = await this.reservationsRepository.findById(
      reservationId,
    );

    return reservation;
  }
}
