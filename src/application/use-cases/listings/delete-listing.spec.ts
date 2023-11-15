import { InMemoryListingsRepository } from '../../../../test/repositories/in-memory-listings-repository';

describe('Delete Listing by ID', () => {
  it('should be able to delete a listing by specific user id and listing id', async () => {
    const listingsRepository = new InMemoryListingsRepository();

    const userId = 'test-user-id';
    const listingId = 'test-listing-id';

    await listingsRepository.create({
      id: listingId,
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

    await listingsRepository.delete(userId, listingId);

    const deletedListing = await listingsRepository.findById(listingId);

    expect(deletedListing).toBeNull();
  });
});
