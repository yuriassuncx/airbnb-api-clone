import { InMemoryUsersRepository } from '../../../../test/repositories/in-memory-users-repository';
import { CreateUser } from './create-user';

describe('Create User', () => {
  it('should be able to create a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository);

    const { user } = await createUser.execute({
      id: 'user',
      name: 'user',
      email: 'test@gmail.com',
      emailVerified: new Date(),
      hashedPassword: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
      favoriteIds: ['test'],
      image: '#',
    });

    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0]).toEqual(user);
  });
});
