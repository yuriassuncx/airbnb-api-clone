import type { Reservation as TReservation } from '@prisma/client';

export class Reservation implements Omit<TReservation, 'createdAt'> {
  public readonly id: string;
  public userId: string;
  public listingId: string;
  public startDate: Date;
  public endDate: Date;
  public totalPrice: number;

  constructor(props: Reservation) {
    Object.assign(this, props);
  }
}
