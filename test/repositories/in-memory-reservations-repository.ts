import { Reservation } from 'src/application/entities/reservation';
import { ReservationsRepository } from 'src/application/repositories/reservations-repository';

export class InMemoryReservationsRepository implements ReservationsRepository {
  public reservations: Reservation[] = [];

  async create(reservation: Reservation): Promise<void> {
    this.reservations.push(reservation);
  }

  async findMany(): Promise<Reservation[] | null> {
    return this.reservations.map((item) => item);
  }

  async findById(reservationId: string): Promise<Reservation | null> {
    const reservation = this.reservations.find(
      (reservation) => reservation.id === reservationId,
    );

    return reservation || null;
  }

  async findByUserId(userId: string): Promise<Reservation[] | null> {
    const reservations = this.reservations.filter(
      (reservation) => reservation.userId === userId,
    );

    return reservations;
  }

  async update(
    reservationId: string,
    reservation: Partial<Reservation>,
  ): Promise<Reservation> {
    const reservationIndex = this.reservations.findIndex(
      (reservation) => reservation.id === reservationId,
    );

    if (reservationIndex === -1) {
      throw new Error('Reservation not found');
    }

    const updatedReservations = {
      ...this.reservations[reservationIndex],
      ...reservation,
    };

    this.reservations[reservationIndex] = updatedReservations;

    return updatedReservations;
  }

  async delete(userId: string, reservationId: string): Promise<void> {
    const reservationIndex = this.reservations.findIndex(
      (reservation) =>
        reservation.id === reservationId && reservation.userId === userId,
    );

    if (reservationIndex === -1) {
      throw new Error('Reservation not found');
    }

    this.reservations.splice(reservationIndex, 1);
  }
}
