import { Injectable } from '@nestjs/common';
import { ListingsRepository } from '../../repositories/listings-repository';
import { UpdateListingBody } from '../../../infra/http/dtos/update-listing-body';
import { Listing } from '../../entities/listing';

@Injectable()
export class UpdateListing {
  constructor(private readonly listingsRepository: ListingsRepository) {}

  async execute(
    userId: string,
    listingId: string,
    body: UpdateListingBody,
  ): Promise<Listing> {
    const listing = await this.listingsRepository.update(
      userId,
      listingId,
      body,
    );

    return listing;
  }
}
