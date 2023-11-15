import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ReservationsRepository } from '../../application/repositories/reservations-repository';
import { PrismaReservationsRepository } from './prisma/repositories/prisma-reservations-repository';
import { ListingsRepository } from '../../application/repositories/listings-repository';
import { PrismaListingsRepository } from './prisma/repositories/prisma-listings-repository';
import { UsersRepository } from '../../application/repositories/users-repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ReservationsRepository,
      useClass: PrismaReservationsRepository,
    },
    {
      provide: ListingsRepository,
      useClass: PrismaListingsRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [ReservationsRepository, ListingsRepository, UsersRepository],
})
export class DatabaseModule {}
