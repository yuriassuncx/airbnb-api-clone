import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from '../../../application/entities/user';

export class CreateUserBody implements User {
  @IsOptional()
  public id: string;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsOptional()
  public emailVerified: Date;

  @IsNotEmpty()
  public hashedPassword: string;

  @IsOptional()
  public image: string;

  @IsOptional()
  @IsDate()
  public createdAt: Date;

  @IsOptional()
  @IsDate()
  public updatedAt: Date;

  @IsOptional()
  public favoriteIds: string[];
}
