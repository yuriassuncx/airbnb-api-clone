import { InMemoryListingsRepository } from '../../../../test/repositories/in-memory-listings-repository';
import { CreateListing } from './create-listing';

describe('Create Listing', () => {
  it('should be able to create a listing', async () => {
    const listingsRepository = new InMemoryListingsRepository();
    const createListing = new CreateListing(listingsRepository);

    const { listing } = await createListing.execute({
      id: 'test',
      userId: 'test',
      title: 'test',
      imageSrc: '#',
      bathroomCount: 2,
      category: 'test',
      createdAt: new Date(),
      description: 'test',
      roomCount: 2,
      guestCount: 2,
      locationValue: 'BR',
      price: 500.0,
    });

    expect(listingsRepository.listings).toHaveLength(1);
    expect(listingsRepository.listings[0]).toEqual(listing);
  });
});
