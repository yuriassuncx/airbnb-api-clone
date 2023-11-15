import { User } from 'src/application/entities/user';
import { UsersRepository } from 'src/application/repositories/users-repository';
import { Listing } from 'src/application/entities/listing';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];
  public listings: Listing[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async login(email: string, password: string): Promise<User> {
    const loggedUser = this.users.find(
      (user) => user.email === email && user.hashedPassword && password,
    );

    if (!loggedUser) {
      throw new Error('User not exists.');
    }

    return loggedUser;
  }

  async favorite(userId: string, listingId: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...this.users[userIndex],
      favoriteIds: [...this.users[userIndex].favoriteIds, listingId],
    };

    this.users[userIndex] = updatedUser;
  }

  async update(userId: string, user: Partial<User>): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...this.users[userIndex],
      ...user,
    };

    this.users[userIndex] = updatedUser;

    return updatedUser;
  }

  async delete(userId: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    this.users.splice(userIndex, 1);
  }
}
