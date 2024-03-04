import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/User/dto/CreateUser.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserService } from 'src/User/User.service';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
                private userService: UserService        
        ){}

    // @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async signIn(@Body() createUserDto:CreateUserDto){
        return this.authService.validateUser(createUserDto.username, createUserDto.password)
    }

    @Post('register')
    async registerUser(@Body() createUserDto:CreateUserDto){
        return await this.userService.createUser(createUserDto)
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refreshToken(@Request() req){
        return this.authService.refreshToken(req._id)
    }




}
