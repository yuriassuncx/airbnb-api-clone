import type { Listing as TListing } from '@prisma/client';

export class Listing implements TListing {
  public readonly id: string;
  public title: string;
  public description: string;
  public imageSrc: string;
  public createdAt: Date;
  public category: string;
  public roomCount: number;
  public bathroomCount: number;
  public guestCount: number;
  public locationValue: string;
  public userId: string;
  public price: number;

  constructor(props: Listing) {
    Object.assign(this, props);
  }
}
