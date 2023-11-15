import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GetListings } from '../../../application/use-cases/listings/get-listings';
import { GetListingById } from '../../../application/use-cases/listings/get-listing-by-id';
import { GetListingsByUserId } from '../../../application/use-cases/listings/get-listings-by-user-id';
import { CreateListing } from '../../../application/use-cases/listings/create-listing';
import { UpdateListing } from '../../../application/use-cases/listings/update-listing';
import { DeleteListing } from '../../../application/use-cases/listings/delete-listing';
import { CreateListingBody } from '../dtos/create-listing-body';
import { UpdateListingBody } from '../dtos/update-listing-body';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('listings')
@ApiTags('listings')
export class ListingsController {
  constructor(
    private getListings: GetListings,
    private getListingById: GetListingById,
    private getListingByUserId: GetListingsByUserId,
    private createListing: CreateListing,
    private updateListing: UpdateListing,
    private deleteListing: DeleteListing,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as listagens' })
  @ApiResponse({
    status: 200,
    description: 'Captura de Listagens realizada com sucesso',
    isArray: true,
  })
  async findMany() {
    const listings = await this.getListings.execute();

    return {
      listings,
    };
  }

  @Get(':listingId')
  @ApiOperation({ summary: 'Listar uma listagem pelo seu ID' })
  @ApiResponse({
    status: 200,
    description: 'Listagem capturada com sucesso',
  })
  async findById(@Param('listingId') listingId: string) {
    const listing = await this.getListingById.execute({
      listingId,
    });

    return {
      listing,
    };
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Listar todas as listagens de um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Captura de Listagens pelo usuário realizada com sucesso',
    isArray: true,
  })
  async findByUserId(@Param('userId') userId: string) {
    const listings = await this.getListingByUserId.execute({
      userId,
    });

    return {
      listings,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Adicionar uma nova listagem' })
  @ApiResponse({
    status: 201,
    description: 'Uma nova listagem foi criada com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  async create(@Body() body: CreateListingBody) {
    const { listing } = await this.createListing.execute(body);

    return {
      listing,
    };
  }

  @Patch(':userId/:listingId')
  @ApiOperation({ summary: 'Atualizar uma única listagem pelo seu ID' })
  @ApiResponse({ status: 200, description: 'Listagem atualizada com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Listagem pelo seu ID não foi encontrada',
  })
  async update(
    @Param('userId') userId: string,
    @Param('listingId') listingId: string,
    @Body() updateListing: UpdateListingBody,
  ) {
    const listing = await this.updateListing.execute(
      listingId,
      userId,
      updateListing,
    );

    return { listing };
  }

  @Delete(':userId/:listingId')
  @ApiOperation({ summary: 'Remover uma única listagem pelo seu ID' })
  @ApiResponse({ status: 200, description: 'Listagem removida com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Listagem pelo seu ID não foi encontrada',
  })
  async delete(
    @Param('userId') userId: string,
    @Param('listingId') listingId: string,
  ) {
    await this.deleteListing.execute(userId, listingId);
  }
}
