import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  getfindAll(): User[] | PromiseLike<User[]> {
    throw new Error('Method not implemented.');
  }

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Crear un usuario
  async createUser(userDto:UserDto):Promise<User> {
    const encryptedPassword: string = await bcrypt.hash(userDto.password, 10);
    const newUser = this.userRepository.create({ ...userDto, password: encryptedPassword });
    return this.userRepository.save(newUser);
  }

  // Obtener todos los usuarios
   getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Obtener un usuario por ID
  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  }



  // Actualizar un usuario
  async updateUser(id: number, firstName: string, lastName: string, email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    const encryptedPassword: string = await bcrypt.hash(password, 10);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = encryptedPassword;
    return this.userRepository.save(user);
  }

  // Eliminar un usuario
  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
        where: {
            email
        }
    });
 } 

 findAllByEmailWhithPassword(email:string){
  return this.userRepository.findOne({
    where:{email},
    select:['id','role','email','password','lastName' ]
  })
 }

}