import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from '../../repositories/reservations-repository';
import { CreateReservationBody } from '../../../infra/http/dtos/create-reservation-body';
import { Reservation } from '../../entities/reservation';

interface CreateReservationResponse {
  reservation: Reservation;
}

@Injectable()
export class CreateReservation {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  async execute(
    reservation: CreateReservationBody,
  ): Promise<CreateReservationResponse> {
    const newReservation = new Reservation(reservation);

    await this.reservationsRepository.create(newReservation);

    return {
      reservation: newReservation,
    };
  }
}
