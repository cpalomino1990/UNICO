
import { BadGatewayException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {  RegisterDto } from './dto/register.dto'; 

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findAllByEmailWhithPassword(email);
    
    if (user === null) {
      throw new UnauthorizedException();
    }

    console.log(pass);
    console.log(user.password);

    const authenticated: boolean = await bcrypt.compare(pass, user.password);
    if (!authenticated) {
      throw new UnauthorizedException();
           
    }
       
    if (typeof pass !== 'string' || typeof user.password !== 'string') {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, user: user.firstName, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
 
// registar Usuario//

  async register(registerDto:RegisterDto){
   
    const user = await this.userService.findOneByEmail(registerDto.email); 
    if ( user){
       throw new BadGatewayException ("Usuario ya se encuentra registrado")
    }
    return await this.userService.createUser(registerDto)

  

  }

async profile ({email, role}: {email:string, role:string }){
//  if (role !== Role.ADMIN){
//   throw new UnauthorizedException('usted no es admin, no esta autorizafo ')
 console.log(role);
 
  return await this.userService.findOneByEmail(email);
}


}