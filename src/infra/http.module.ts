import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ReservationsController } from './http/controllers/reservations.controller';
import { ListingsController } from './http/controllers/listings.controller';
import { UsersController } from './http/controllers/users.controller';
import { GetReservationById } from '../application/use-cases/reservations/get-reservation-by-id';
import { GetReservationsByUserId } from '../application/use-cases/reservations/get-reservations-by-user-id';
import { GetReservations } from '../application/use-cases/reservations/get-reservations';
import { CreateReservation } from '../application/use-cases/reservations/create-reservation';
import { UpdateReservation } from '../application/use-cases/reservations/update-reservation';
import { DeleteReservation } from '../application/use-cases/reservations/delete-reservation';
import { GetListings } from '../application/use-cases/listings/get-listings';
import { GetListingById } from '../application/use-cases/listings/get-listing-by-id';
import { GetListingsByUserId } from '../application/use-cases/listings/get-listings-by-user-id';
import { CreateListing } from '../application/use-cases/listings/create-listing';
import { UpdateListing } from '../application/use-cases/listings/update-listing';
import { DeleteListing } from '../application/use-cases/listings/delete-listing';
import { CreateUser } from '../application/use-cases/users/create-user';
import { LoginUser } from '../application/use-cases/users/login-user';
import { UpdateUser } from '../application/use-cases/users/update-user';
import { DeleteUser } from '../application/use-cases/users/delete-user';
import { FavoriteListing } from '../application/use-cases/users/favorite-listing';

@Module({
  imports: [DatabaseModule],
  controllers: [ReservationsController, ListingsController, UsersController],
  providers: [
    GetReservations,
    GetReservationById,
    GetReservationsByUserId,
    CreateReservation,
    UpdateReservation,
    DeleteReservation,
    GetListings,
    GetListingById,
    GetListingsByUserId,
    CreateListing,
    UpdateListing,
    DeleteListing,
    CreateUser,
    LoginUser,
    UpdateUser,
    DeleteUser,
    FavoriteListing,
  ],
})
export class HttpModule {}
