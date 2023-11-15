import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LoginUser } from '../../../application/use-cases/users/login-user';
import { CreateUser } from '../../../application/use-cases/users/create-user';
import { UpdateUser } from '../../../application/use-cases/users/update-user';
import { DeleteUser } from '../../../application/use-cases/users/delete-user';
import { FavoriteListing } from '../../../application/use-cases/users/favorite-listing';
import { LoginUserBody } from '../dtos/login-user-body';
import { CreateUserBody } from '../dtos/create-user-body';
import { UpdateUserBody } from '../dtos/update-user-body';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private loginUser: LoginUser,
    private createUser: CreateUser,
    private updateUser: UpdateUser,
    private deleteUser: DeleteUser,
    private favoriteListing: FavoriteListing,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Captura de Usuários realizada com sucesso',
    isArray: true,
  })
  async login(@Body() loginUserBody: LoginUserBody) {
    const { email, hashedPassword } = loginUserBody;

    const { user } = await this.loginUser.execute(email, hashedPassword);

    return {
      user,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Adicionar um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Um novo usuário foi criada com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  async create(@Body() body: CreateUserBody) {
    const { user } = await this.createUser.execute(body);

    return {
      user,
    };
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Atualizar um único usuário pelo seu ID' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  async update(
    @Param('userId') userId: string,
    @Body() updateUser: UpdateUserBody,
  ) {
    const user = await this.updateUser.execute(userId, updateUser);

    return { user };
  }

  @Patch(':userId/:listingId')
  @ApiOperation({
    summary: 'Favoritar uma única listagem pelo seu ID e pelo ID do usuário',
  })
  @ApiResponse({ status: 200, description: 'Listagem favoritada com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Listagem não favoritada',
  })
  async favorite(
    @Param('userId') userId: string,
    @Param('listingId') listingId: string,
  ) {
    await this.favoriteListing.execute(userId, listingId);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Remover um único usuário pelo seu ID' })
  @ApiResponse({ status: 200, description: 'Usuário removido com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  async delete(@Param('userId') userId: string) {
    await this.deleteUser.execute(userId);
  }
}
