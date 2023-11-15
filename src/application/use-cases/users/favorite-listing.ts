import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users-repository';

@Injectable()
export class FavoriteListing {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userId: string, listingId: string): Promise<void> {
    await this.usersRepository.favorite(userId, listingId);
  }
}
