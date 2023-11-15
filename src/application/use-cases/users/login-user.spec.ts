import { InMemoryUsersRepository } from '../../../../test/repositories/in-memory-users-repository';
import { CreateUser } from './create-user';
import { LoginUser } from './login-user';

describe('Login User', () => {
  it('should be able to login a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository);
    const loginUser = new LoginUser(usersRepository);

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

    const { user: loggedUser } = await loginUser.execute(
      user.email,
      user.hashedPassword,
    );

    expect(loggedUser).toEqual(user);
  });
});
