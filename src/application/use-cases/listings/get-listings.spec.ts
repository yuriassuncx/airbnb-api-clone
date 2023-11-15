import { InMemoryListingsRepository } from '../../../../test/repositories/in-memory-listings-repository';
import { GetListings } from '../../use-cases/listings/get-listings';
import { Listing } from 'src/application/entities/listing';

describe('Get Listings', () => {
  it('should be able to get listings', async () => {
    const reservationsRepository = new InMemoryListingsRepository();
    const getListings = new GetListings(reservationsRepository);

    const listing: Omit<Listing, 'id'> = {
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
    };

    await reservationsRepository.create({ id: 'test1', ...listing });
    await reservationsRepository.create({ id: 'test2', ...listing });

    const listings = await getListings.execute();

    expect(listings).toHaveLength(2);
    expect(listings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'test1' }),
        expect.objectContaining({ id: 'test2' }),
      ]),
    );
  });
});
