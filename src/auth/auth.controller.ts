import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/User/dto/CreateUser.dto';



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() createUserDto:CreateUserDto){
        return this.authService.validateUser(createUserDto.username, createUserDto.password)
    }
}
