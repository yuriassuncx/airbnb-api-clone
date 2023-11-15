import { User } from '../../application/entities/user';

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;
  abstract login(email: string, password: string): Promise<User>;
  abstract favorite(userId: string, listingId: string): Promise<void>;
  abstract update(userId: string, user: Partial<User>): Promise<User>;
  abstract delete(userId: string): Promise<void>;
}
