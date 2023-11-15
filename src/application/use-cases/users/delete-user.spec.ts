import { InMemoryUsersRepository } from '../../../../test/repositories/in-memory-users-repository';

describe('Delete User by ID', () => {
  it('should be able to delete a user by specific id', async () => {
    const usersRepository = new InMemoryUsersRepository();

    const userId = 'test-user-id';

    await usersRepository.create({
      id: userId,
      name: 'user',
      email: 'test@gmail.com',
      emailVerified: new Date(),
      hashedPassword: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
      favoriteIds: ['test'],
      image: '#',
    });

    await usersRepository.delete(userId);

    expect(usersRepository.users).toHaveLength(0);
  });
});
