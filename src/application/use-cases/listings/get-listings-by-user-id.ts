import { Injectable } from '@nestjs/common';
import { ListingsRepository } from '../../../application/repositories/listings-repository';
import { Listing } from '../../entities/listing';

interface GetListingByUserIdRequest {
  userId: string;
}

@Injectable()
export class GetListingsByUserId {
  constructor(private readonly listingsRepository: ListingsRepository) {}

  async execute(request: GetListingByUserIdRequest): Promise<Listing[] | null> {
    const { userId } = request;

    const listings = await this.listingsRepository.findByUserId(userId);

    return listings;
  }
}
