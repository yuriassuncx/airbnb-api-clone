import { InMemoryReservationsRepository } from '../../../../test/repositories/in-memory-reservations-repository';

describe('Delete Reservation by ID', () => {
  it('should be able to delete a reservation by specific id', async () => {
    const reservationsRepository = new InMemoryReservationsRepository();

    const reservationId = 'test-reservation-id';
    const userId = 'test-user-id';

    await reservationsRepository.create({
      id: reservationId,
      userId,
      listingId: 'testListingId',
      startDate: new Date('2023-11-01'),
      endDate: new Date('2023-11-05'),
      totalPrice: 500.0,
    });

    await reservationsRepository.delete(userId, reservationId);

    const deletedReservation = await reservationsRepository.findById(
      reservationId,
    );

    expect(deletedReservation).toBeNull();
  });
});
