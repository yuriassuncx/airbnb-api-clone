import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users-repository';
import { User } from '../../entities/user';

interface LoginUserResponse {
  user: User;
}

@Injectable()
export class LoginUser {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(email: string, password: string): Promise<LoginUserResponse> {
    const user = await this.usersRepository.login(email, password);

    return {
      user,
    };
  }
}
