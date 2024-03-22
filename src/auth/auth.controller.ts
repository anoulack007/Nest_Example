import { Body, Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
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



  // @Post('email/reset-password')
  // @HttpCode(HttpStatus.OK)
  // public async setNewPassword(
  //   @Body() resetPassword:ResetPasswordDto
  // ): Promise<IResponse> {
  //   try{
  //     var isNewPasswordChanged: boolean = false;
  //     if(resetPassword.email && resetPassword.currentPassword){
  //       const isValidPassword = await this.authService.checkPassword(
  //         resetPassword.email,
  //         resetPassword.currentPassword
  //       );
  //       if(isValidPassword){
  //         isNewPasswordChanged = await this.userService.setPassword(
  //           resetPassword.email,
  //           resetPassword.newPassword
  //         )}else {
  //           return new ResponseError("RESET_PASSWORD.WRONG_CURRENT_PASSWORD")
  //         }

        
  //     }else if(resetPassword.newPasswordToken){
  //       const forgottenPasswordModel = await this.authService.getForgottenPasswordModel(
  //         resetPassword.newPasswordToken
  //       );
  //       isNewPasswordChanged = await this.userService.setPassword(
  //         forgottenPasswordModel.email,
  //         resetPassword.newPassword
  //       )
  //       if(isNewPasswordChanged) await forgottenPasswordModel.remove()
  //     }else{
  //       return new ResponseError("RESET_PASSWORD.CHANGE_PASSWORD_ERROR")
  //     }
  //     return new ResponseSuccess(
  //       "RESET_PASSWORD.PASSWORD_CHANGED",
  //       isNewPasswordChanged
  //     )

  //   }catch(error){
  //     return new ResponseError("RESET_PASSWORD.CHANGE_PASSWORD_ERROE", error)
  //   }
  // }
}
