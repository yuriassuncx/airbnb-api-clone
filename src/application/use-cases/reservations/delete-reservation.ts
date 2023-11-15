import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from '../../../application/repositories/reservations-repository';

@Injectable()
export class DeleteReservation {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  async execute(userId: string, reservationId: string): Promise<void> {
    await this.reservationsRepository.delete(userId, reservationId);
  }
}
