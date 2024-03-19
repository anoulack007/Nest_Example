import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
// import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { SignUpDto } from 'src/User/dto/signup.dto';
import { SignInDto } from 'src/User/dto/signin.dto';



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,     
        ){}

    // @UseGuards(LocalAuthGuard)
    @Post('signup')
    signUp(@Body() signupDto: SignUpDto) {
        return this.authService.signUp(signupDto)
    }
    
    
    // @UseGuards(LocalAuthGuard)
    @Post('signin')
    signIn(@Body() signinDto:SignInDto) {
        return this.authService.signIn(signinDto)
    }







}
