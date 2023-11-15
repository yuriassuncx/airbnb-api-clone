import { InMemoryListingsRepository } from '../../../../test/repositories/in-memory-listings-repository';
import { UpdateListingBody } from '../../../infra/http/dtos/update-listing-body';

describe('Update Reservation', () => {
  it('should be able to update a listing by specific user id and listing id', async () => {
    const listingsRepository = new InMemoryListingsRepository();

    const updatedListingData: UpdateListingBody = {
      price: 750.0,
    };

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

    const updatedListing = await listingsRepository.update(
      'test',
      'test',
      updatedListingData,
    );

    expect(updatedListing).toEqual(expect.objectContaining(updatedListingData));
  });
});
