import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GetReservations } from '../../../application/use-cases/reservations/get-reservations';
import { GetReservationById } from '../../../application/use-cases/reservations/get-reservation-by-id';
import { GetReservationsByUserId } from '../../../application/use-cases/reservations/get-reservations-by-user-id';
import { CreateReservation } from '../../../application/use-cases/reservations/create-reservation';
import { UpdateReservation } from '../../../application/use-cases/reservations/update-reservation';
import { DeleteReservation } from '../../../application/use-cases/reservations/delete-reservation';
import { CreateReservationBody } from '../dtos/create-reservation-body';
import { UpdateReservationBody } from '../dtos/update-reservation-body';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('reservations')
@ApiTags('reservations')
export class ReservationsController {
  constructor(
    private getReservations: GetReservations,
    private getReservationById: GetReservationById,
    private getReservationsByUserId: GetReservationsByUserId,
    private createReservation: CreateReservation,
    private updateReservation: UpdateReservation,
    private deleteReservation: DeleteReservation,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as reservas' })
  @ApiResponse({
    status: 200,
    description: 'Captura de Reservas realizada com sucesso',
    isArray: true,
  })
  async findMany() {
    const reservations = await this.getReservations.execute();

    return {
      reservations,
    };
  }

  @Get(':reservationId')
  @ApiOperation({ summary: 'Listar uma listagem pelo seu ID' })
  @ApiResponse({
    status: 200,
    description: 'Listagem capturada com sucesso',
  })
  async findById(@Param('reservationId') reservationId: string) {
    const reservation = await this.getReservationById.execute({
      reservationId,
    });

    return {
      reservation,
    };
  }

  @Get(':userId/user')
  @ApiOperation({ summary: 'Listar todas as reservas de um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Captura de Reservas pelo usuário realizada com sucesso',
    isArray: true,
  })
  async findByUserId(@Param('userId') userId: string) {
    const reservations = await this.getReservationsByUserId.execute({
      userId,
    });

    return {
      reservations,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Adicionar uma nova reserva' })
  @ApiResponse({
    status: 201,
    description: 'Uma nova reserva foi criada com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  async create(@Body() body: CreateReservationBody) {
    const { reservation } = await this.createReservation.execute(body);

    return {
      reservation,
    };
  }

  @Patch(':reservationId')
  @ApiOperation({ summary: 'Atualizar uma única reserva pelo seu ID' })
  @ApiResponse({ status: 200, description: 'Reserva atualizada com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Reserva não encontrada',
  })
  async update(
    @Param('reservationId') reservationId: string,
    @Body() updateReservation: UpdateReservationBody,
  ) {
    const reservation = await this.updateReservation.execute(
      reservationId,
      updateReservation,
    );

    return { reservation };
  }

  @Delete(':userId/:reservationId')
  @ApiOperation({ summary: 'Remover uma única reserva pelo seu ID' })
  @ApiResponse({ status: 200, description: 'Reserva removida com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Reserva não encontrada',
  })
  async delete(
    @Param('userId') userId: string,
    @Param('reservationId') reservationId: string,
  ) {
    const reservation = await this.deleteReservation.execute(
      userId,
      reservationId,
    );

    return reservation;
  }
}
