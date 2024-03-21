import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/User/dto/signup.dto';
import { SignInDto } from 'src/User/dto/signin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(FileInterceptor('image',{
    storage:diskStorage({
        destination:"./src/Images",
        filename:(req,file, callBack)=>{
            const fileName = path.parse(file.originalname).name.replace(/\s/g,'')+Date.now();
            const extension = path.parse(file.originalname).ext;
            callBack(null, `${fileName}${extension}`);
        }
    })
}))
  signUp(@Body()  signupDto: SignUpDto,@UploadedFile() file) {
    console.log(file)
    return this.authService.signUp(signupDto,file.originalname);
  }

  @Post('signin')
  signIn(@Body() signinDto: SignInDto) {
    return this.authService.signIn(signinDto);
  }

  @Post('refresh')
  refresh(@Body() refreshToken: any) {
    return this.authService.refreshAccessToken(refreshToken);
  }
}
