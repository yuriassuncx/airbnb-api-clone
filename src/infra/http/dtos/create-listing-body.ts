import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Listing } from '../../../application/entities/listing';

export class CreateListingBody implements Listing {
  @IsOptional()
  public id: string;

  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public imageSrc: string;

  @IsDate()
  public createdAt: Date;

  @IsNotEmpty()
  public category: string;

  @IsNotEmpty()
  @IsNumber()
  public roomCount: number;

  @IsNotEmpty()
  @IsNumber()
  public bathroomCount: number;

  @IsNotEmpty()
  @IsNumber()
  public price: number;

  @IsNotEmpty()
  @IsNumber()
  public guestCount: number;

  @IsNotEmpty()
  public locationValue: string;

  @IsNotEmpty()
  public userId: string;
}
