import { InMemoryUsersRepository } from '../../../../test/repositories/in-memory-users-repository';
import { UpdateUserBody } from '../../../infra/http/dtos/update-user-body';

describe('Update User', () => {
  it('should be able to update a user by specific id', async () => {
    const usersRepository = new InMemoryUsersRepository();

    const updatedUserData: UpdateUserBody = {
      name: 'userUpdated',
    };

    await usersRepository.create({
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

    const updatedUser = await usersRepository.update('user', updatedUserData);

    expect(updatedUser).toEqual(expect.objectContaining(updatedUserData));
  });
});
