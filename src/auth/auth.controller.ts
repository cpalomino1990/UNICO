import { Body, Controller, Get, HttpCode, HttpStatus, Post,   } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto'; 
import { Role } from '../common/enums/rol.enum';
import { Auth } from './decorators/auh.decorators';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { USerActiveInteface } from 'src/common/interfaces/user-active.interface';




@Controller('auth')
export class AuthController {


    constructor(
        private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)

    @Post('login')

    @ApiOperation({ summary: 'User login' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string' },
                password: { type: 'string' }
            },
            required: ['email', 'password']
        }
    })
    @ApiResponse({ status: 200, description: 'Successful login' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    
    signIn(@Body() loginDto:LoginDto) {
        return this.authService.signIn(loginDto.email, loginDto.password);
    }

    //registrar Usuario//

    @Post ('register')
    register(
        @Body()
        registerDto:RegisterDto
    ){
      return this.authService.register(registerDto)
    }

  
    @Get('profile')
    @Auth(Role.ADMIN)
  
    @ApiOperation({ summary: 'Retrieve the profile of the authenticated user' })
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved user profile',
        schema: {
            type: 'object',
            properties: {
                sub: { type: 'string', description: 'The user ID' },
                email: {
                    type: 'string', description: 'The email of the user',
                }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized, JWT token is missing or invalid' })
    @ApiBearerAuth()

    getProfile(@ActiveUser() user:USerActiveInteface) {
   
        return this.authService.profile(user)
    }

}
