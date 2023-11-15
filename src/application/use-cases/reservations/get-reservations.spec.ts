import { InMemoryReservationsRepository } from '../../../../test/repositories/in-memory-reservations-repository';
import { GetReservations } from '../../use-cases/reservations/get-reservations';
import { Reservation } from 'src/application/entities/reservation';

describe('Get Reservations', () => {
  it('should be able to get reservations', async () => {
    const reservationsRepository = new InMemoryReservationsRepository();
    const getReservations = new GetReservations(reservationsRepository);

    const reservation: Omit<Reservation, 'id'> = {
      userId: 'user123',
      listingId: 'listing456',
      startDate: new Date('2023-11-01'),
      endDate: new Date('2023-11-05'),
      totalPrice: 500.0,
    };

    await reservationsRepository.create({ id: 'test1', ...reservation });
    await reservationsRepository.create({ id: 'test2', ...reservation });

    const reservations = await getReservations.execute();

    expect(reservations).toHaveLength(2);
    expect(reservations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'test1' }),
        expect.objectContaining({ id: 'test2' }),
      ]),
    );
  });
});
