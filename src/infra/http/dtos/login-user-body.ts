import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserBody {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public hashedPassword: string;
}
