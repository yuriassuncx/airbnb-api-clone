import { InMemoryReservationsRepository } from '../../../../test/repositories/in-memory-reservations-repository';

describe('Get Reservation by ID', () => {
  it('should be able to get a reservation by specific id', async () => {
    const reservationsRepository = new InMemoryReservationsRepository();

    await reservationsRepository.create({
      id: 'test',
      userId: 'user123',
      listingId: 'listing456',
      startDate: new Date('2023-11-01'),
      endDate: new Date('2023-11-05'),
      totalPrice: 500.0,
    });

    const filteredReservation = await reservationsRepository.findById('test');

    expect(filteredReservation).toEqual(
      expect.objectContaining({ id: 'test' }),
    );
  });
});
