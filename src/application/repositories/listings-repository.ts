import { Listing } from '../entities/listing';

export abstract class ListingsRepository {
  abstract create(listing: Listing): Promise<void>;
  abstract findMany(): Promise<Listing[] | null>;
  abstract findById(listingId: string): Promise<Listing | null>;
  abstract findByUserId(userId: string): Promise<Listing[] | null>;
  abstract update(
    listingId: string,
    userId: string,
    listing: Partial<Listing>,
  ): Promise<Listing>;
  abstract delete(userId: string, listingId: string): Promise<void>;
}
