import { InMemoryReservationsRepository } from '../../../../test/repositories/in-memory-reservations-repository';
import { UpdateReservationBody } from '../../../infra/http/dtos/update-reservation-body';

describe('Update Reservation', () => {
  it('should be able to update a reservation by specific id', async () => {
    const reservationsRepository = new InMemoryReservationsRepository();

    const updatedReservationData: UpdateReservationBody = {
      userId: 'user123',
      listingId: 'listing456',
      startDate: new Date('2023-11-01'),
      endDate: new Date('2023-11-05'),
      totalPrice: 600.0,
    };

    await reservationsRepository.create({
      id: 'test',
      userId: 'user123',
      listingId: 'listing456',
      startDate: new Date('2023-11-01'),
      endDate: new Date('2023-11-05'),
      totalPrice: 500.0,
    });

    const updatedReservation = await reservationsRepository.update(
      'test',
      updatedReservationData,
    );

    expect(updatedReservation).toEqual(
      expect.objectContaining(updatedReservationData),
    );
  });
});
