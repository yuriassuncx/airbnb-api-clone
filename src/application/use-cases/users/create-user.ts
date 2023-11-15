import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users-repository';
import { CreateUserBody } from '../../../infra/http/dtos/create-user-body';
import { User } from '../../entities/user';

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(user: CreateUserBody): Promise<CreateUserResponse> {
    const newUser = new User(user);

    await this.usersRepository.create(newUser);

    return {
      user: newUser,
    };
  }
}
