import { Reservation } from '../../../../application/entities/reservation';
import { ReservationsRepository } from '../../../../application/repositories/reservations-repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaReservationsRepository implements ReservationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(reservation: Reservation): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: reservation.userId,
      },
    });

    if (!user) {
      throw new HttpException('User does not exists!', HttpStatus.NOT_FOUND);
    }

    const listing = await this.prisma.listing.findUnique({
      where: {
        id: reservation.listingId,
      },
    });

    if (!listing) {
      throw new HttpException('Listing does not exists!', HttpStatus.NOT_FOUND);
    }

    await this.prisma.reservation.create({
      data: reservation,
    });
  }

  async findMany(): Promise<Reservation[] | null> {
    const reservations = await this.prisma.reservation.findMany();

    return reservations;
  }

  async findById(reservationId: string): Promise<Reservation> {
    const filteredReservation = await this.prisma.reservation.findUnique({
      where: {
        id: reservationId,
      },
    });

    if (!filteredReservation) {
      throw new HttpException(
        'Reservation does not exists!',
        HttpStatus.NOT_FOUND,
      );
    }

    return filteredReservation;
  }

  async findByUserId(userId: string): Promise<Reservation[] | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException('User does not exists!', HttpStatus.NOT_FOUND);
    }

    const filteredReservations = await this.prisma.reservation.findMany({
      where: {
        userId,
      },
    });

    if (!filteredReservations) {
      throw new HttpException(
        'Reservation does not exists!',
        HttpStatus.NOT_FOUND,
      );
    }

    return filteredReservations;
  }

  async update(
    reservationId: string,
    reservation: Partial<Reservation>,
  ): Promise<Reservation> {
    const reservationUpdated = await this.prisma.reservation.update({
      where: {
        id: reservationId,
      },
      data: reservation,
    });

    if (!reservationUpdated) {
      throw new HttpException(
        'Reservation does not exists!',
        HttpStatus.NOT_FOUND,
      );
    }

    return reservationUpdated;
  }

  async delete(userId: string, reservationId: string): Promise<void> {
    const availableReservation = await this.prisma.reservation.findUnique({
      where: {
        id: reservationId,
        userId,
      },
    });

    if (!availableReservation) {
      throw new HttpException(
        'Reservation does not exists!',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.prisma.reservation.delete({
      where: {
        id: reservationId,
        userId,
      },
    });
  }
}
