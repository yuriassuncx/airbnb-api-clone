import { Listing } from 'src/application/entities/listing';
import { ListingsRepository } from 'src/application/repositories/listings-repository';

export class InMemoryListingsRepository implements ListingsRepository {
  public listings: Listing[] = [];

  async create(listing: Listing): Promise<void> {
    this.listings.push(listing);
  }

  async findMany(): Promise<Listing[] | null> {
    return this.listings.map((item) => item);
  }

  async findById(listingId: string): Promise<Listing | null> {
    const listing = this.listings.find((listing) => listing.id === listingId);

    return listing || null;
  }

  async findByUserId(userId: string): Promise<Listing[] | null> {
    const listings = this.listings.filter(
      (listing) => listing.userId === userId,
    );

    return listings || null;
  }

  async update(
    listingId: string,
    userId: string,
    listing: Partial<Listing>,
  ): Promise<Listing> {
    const listingIndex = this.listings.findIndex(
      (listing) => listing.id === listingId && listing.userId === userId,
    );

    if (listingIndex === -1) {
      throw new Error('Listing not found');
    }

    const updatedListing = {
      ...this.listings[listingIndex],
      ...listing,
    };

    this.listings[listingIndex] = updatedListing;

    return updatedListing;
  }

  async delete(userId: string, listingId: string): Promise<void> {
    const listingIndex = this.listings.findIndex(
      (listing) => listing.id === listingId && listing.userId === userId,
    );

    if (listingIndex === -1) {
      throw new Error('Listing not found');
    }

    this.listings.splice(listingIndex, 1);
  }
}
