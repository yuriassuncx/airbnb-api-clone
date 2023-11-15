import { InMemoryUsersRepository } from '../../../../test/repositories/in-memory-users-repository';

describe('Favorite Listing', () => {
  it('should be able to favorite a listing by your id', async () => {
    const usersRepository = new InMemoryUsersRepository();

    await usersRepository.create({
      id: 'user',
      name: 'user',
      email: 'test@gmail.com',
      emailVerified: new Date(),
      hashedPassword: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
      favoriteIds: [],
      image: '#',
    });

    await usersRepository.favorite('user', 'test');

    expect(usersRepository.users[0].favoriteIds).toHaveLength(1);
    expect(usersRepository.users[0].favoriteIds[0]).toEqual('test');
  });
});
