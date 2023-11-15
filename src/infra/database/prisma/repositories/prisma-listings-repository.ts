import { Listing } from '../../../../application/entities/listing';
import { ListingsRepository } from '../../../../application/repositories/listings-repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaListingsRepository implements ListingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(listing: Listing): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: listing.userId,
      },
    });

    if (!user) {
      throw new HttpException('User does not exists!', HttpStatus.NOT_FOUND);
    }

    await this.prisma.listing.create({
      data: listing,
    });
  }

  async findMany(): Promise<Listing[] | null> {
    const listings = await this.prisma.listing.findMany();

    return listings;
  }

  async findById(listingId: string): Promise<Listing | null> {
    const filteredListing = await this.prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    });

    if (!filteredListing) {
      throw new HttpException('Listing does not exists!', HttpStatus.NOT_FOUND);
    }

    return filteredListing;
  }

  async findByUserId(userId: string): Promise<Listing[] | null> {
    const filteredListings = await this.prisma.listing.findMany({
      where: {
        id: userId,
      },
    });

    if (!filteredListings) {
      throw new HttpException('Listings not found!', HttpStatus.NOT_FOUND);
    }

    return filteredListings;
  }

  async update(
    listingId: string,
    userId: string,
    listing: Partial<Listing>,
  ): Promise<Listing> {
    const listingUpdated = await this.prisma.listing.update({
      where: {
        id: listingId,
        userId,
      },
      data: listing,
    });

    if (!listingUpdated) {
      throw new HttpException('Listing does not exists!', HttpStatus.NOT_FOUND);
    }

    return listingUpdated;
  }

  async delete(userId: string, listingId: string): Promise<void> {
    const availableListing = await this.prisma.listing.findUnique({
      where: {
        id: listingId,
        userId,
      },
    });

    if (!availableListing) {
      throw new HttpException('Listing does not exists!', HttpStatus.NOT_FOUND);
    }

    await this.prisma.listing.delete({
      where: {
        id: listingId,
        userId,
      },
    });
  }
}
