import { InMemoryListingsRepository } from '../../../../test/repositories/in-memory-listings-repository';

describe('Get Listing by ID', () => {
  it('should be able to get a listing by specific id', async () => {
    const listingsRepository = new InMemoryListingsRepository();

    await listingsRepository.create({
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

    const filteredListing = await listingsRepository.findById('test');

    expect(filteredListing).toEqual(expect.objectContaining({ id: 'test' }));
  });
});
