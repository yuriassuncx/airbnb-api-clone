import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from '../../../application/repositories/reservations-repository';
import { Reservation } from '../../entities/reservation';

interface GetReservationsByUserIdRequest {
  userId: string;
}

@Injectable()
export class GetReservationsByUserId {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  async execute(
    request: GetReservationsByUserIdRequest,
  ): Promise<Reservation[] | null> {
    const { userId } = request;

    const reservations = await this.reservationsRepository.findByUserId(userId);

    return reservations;
  }
}
