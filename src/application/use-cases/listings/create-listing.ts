import { Injectable } from '@nestjs/common';
import { ListingsRepository } from '../../repositories/listings-repository';
import { CreateListingBody } from '../../../infra/http/dtos/create-listing-body';
import { Listing } from '../../entities/listing';

interface CreateListingResponse {
  listing: Listing;
}

@Injectable()
export class CreateListing {
  constructor(private readonly listingsRepository: ListingsRepository) {}

  async execute(listing: CreateListingBody): Promise<CreateListingResponse> {
    const newListing = new Listing(listing);

    await this.listingsRepository.create(newListing);

    return {
      listing: newListing,
    };
  }
}
