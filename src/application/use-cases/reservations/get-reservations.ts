import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from '../../repositories/reservations-repository';
import { Reservation } from '../../entities/reservation';

@Injectable()
export class GetReservations {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  async execute(): Promise<Reservation[] | null> {
    const reservations = await this.reservationsRepository.findMany();

    return reservations;
  }
}
