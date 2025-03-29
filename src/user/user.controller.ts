import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Unyco')
@Controller('users')
@UsePipes(new ValidationPipe())//👈 Validacion global
export class UserController {
  constructor(private userService: UserService) {}

  // Crear un usuario
  @Post()
  async createUser(@Body() userDto: UserDto){
    return this.userService.createUser(userDto);
  }

  // Obtener todos los usuarios
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  // Obtener un usuario por ID
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  // Actualizar un usuario
// Actualizar un usuario
@Put(':id')
async updateUser(@Param('id') id: number, @Body() userDto: UserDto ){
  return this.userService.updateUser(id, userDto.firstName, userDto.lastName, userDto.email, userDto.password);
}

  // Eliminar un usuario
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}