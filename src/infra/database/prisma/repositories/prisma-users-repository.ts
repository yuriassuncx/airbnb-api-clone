import { User } from '../../../../application/entities/user';
import { UsersRepository } from '../../../../application/repositories/users-repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const availableUser = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (availableUser) {
      throw new HttpException('User already exists!', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(user.hashedPassword, 12);

    await this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        hashedPassword,
        image: user.image ?? null,
      },
    });
  }

  async login(email: string, password: string): Promise<User> {
    const availableUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!availableUser) {
      throw new HttpException('User does not exists!', HttpStatus.NOT_FOUND);
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      availableUser.hashedPassword,
    );

    if (!isPasswordMatch) {
      throw new HttpException('Wrong password!', HttpStatus.UNAUTHORIZED);
    }

    return availableUser;
  }

  async favorite(userId: string, listingId: string): Promise<void> {
    const availableUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!availableUser) {
      throw new HttpException('User does not exists!', HttpStatus.NOT_FOUND);
    }

    const availableListing = await this.prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    });

    if (!availableListing) {
      throw new HttpException('Listing does not exists!', HttpStatus.NOT_FOUND);
    }

    if (availableUser.favoriteIds.includes(listingId)) {
      throw new HttpException(
        'Listing already favorited!',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        favoriteIds: [...availableUser.favoriteIds, listingId],
      },
    });
  }

  async update(userId: string, user: Partial<User>): Promise<User> {
    const availableUser = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!availableUser) {
      throw new HttpException('User does not exists!', HttpStatus.NOT_FOUND);
    }

    const hashedPassword = await bcrypt.hash(user.hashedPassword, 12);

    const userUpdated = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: user.email,
        emailVerified: user.emailVerified,
        name: user.name,
        hashedPassword,
        image: user.image ?? null,
        createdAt: user.createdAt,
        updatedAt: new Date(),
        favoriteIds: user.favoriteIds,
      },
    });

    return userUpdated;
  }

  async delete(userId: string): Promise<void> {
    const availableUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!availableUser) {
      throw new HttpException('User does not exists!', HttpStatus.NOT_FOUND);
    }

    await this.prisma.reservation.delete({
      where: {
        id: userId,
      },
    });
  }
}
