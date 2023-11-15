import { InMemoryListingsRepository } from '../../../../test/repositories/in-memory-listings-repository';

describe('Get Listing by User ID', () => {
  it('should be able to get a listing by specific user id', async () => {
    const listingsRepository = new InMemoryListingsRepository();

    const userId = 'user-id-test';

    await listingsRepository.create({
      id: 'test',
      userId,
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

    await listingsRepository.create({
      id: 'test',
      userId,
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

    const filteredListing = await listingsRepository.findByUserId(userId);

    expect(filteredListing).toHaveLength(2);
  });
});
