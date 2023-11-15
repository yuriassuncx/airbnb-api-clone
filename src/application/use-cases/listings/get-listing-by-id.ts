import { Injectable } from '@nestjs/common';
import { ListingsRepository } from '../../../application/repositories/listings-repository';
import { Listing } from '../../entities/listing';

interface GetListingByIdRequest {
  listingId: string;
}

@Injectable()
export class GetListingById {
  constructor(private readonly listingsRepository: ListingsRepository) {}

  async execute(request: GetListingByIdRequest): Promise<Listing | null> {
    const { listingId } = request;

    const listing = await this.listingsRepository.findById(listingId);

    return listing;
  }
}
