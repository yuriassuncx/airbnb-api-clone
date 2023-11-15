import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../application/repositories/users-repository';

@Injectable()
export class DeleteUser {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userId: string): Promise<void> {
    await this.usersRepository.delete(userId);
  }
}
