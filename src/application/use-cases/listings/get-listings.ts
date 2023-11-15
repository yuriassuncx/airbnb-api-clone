import { Injectable } from '@nestjs/common';
import { ListingsRepository } from '../../repositories/listings-repository';
import { Listing } from '../../entities/listing';

@Injectable()
export class GetListings {
  constructor(private readonly listingsRepository: ListingsRepository) {}

  async execute(): Promise<Listing[] | null> {
    const listings = await this.listingsRepository.findMany();

    return listings;
  }
}
