import { InMemoryReservationsRepository } from '../../../../test/repositories/in-memory-reservations-repository';
import { CreateReservation } from './create-reservation';

describe('Create Reservation', () => {
  it('should be able to create a reservation', async () => {
    const reservationsRepository = new InMemoryReservationsRepository();
    const createReservation = new CreateReservation(reservationsRepository);

    const { reservation } = await createReservation.execute({
      id: 'test',
      userId: 'user123',
      listingId: 'listing456',
      startDate: new Date('2023-11-01'),
      endDate: new Date('2023-11-05'),
      totalPrice: 500.0,
    });

    expect(reservationsRepository.reservations).toHaveLength(1);
    expect(reservationsRepository.reservations[0]).toEqual(reservation);
  });
});
