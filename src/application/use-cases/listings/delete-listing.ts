import { Injectable } from '@nestjs/common';
import { ListingsRepository } from '../../../application/repositories/listings-repository';

@Injectable()
export class DeleteListing {
  constructor(private readonly listingsRepository: ListingsRepository) {}

  async execute(userId: string, listingId: string): Promise<void> {
    await this.listingsRepository.delete(userId, listingId);
  }
}
