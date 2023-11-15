import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users-repository';
import { UpdateUserBody } from '../../../infra/http/dtos/update-user-body';
import { User } from '../../entities/user';

@Injectable()
export class UpdateUser {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userId: string, body: UpdateUserBody): Promise<User> {
    const user = await this.usersRepository.update(userId, body);
    return user;
  }
}
