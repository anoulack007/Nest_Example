import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/User/dto/signup.dto';
import { SignInDto } from 'src/User/dto/signin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PasswordDto } from 'src/User/dto/password.dto';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  
    @Post('signup')
    @UseInterceptors(FileInterceptor('image',{}))
    signUp(
      @Body()  signupDto: SignUpDto,
      // @Body() createProfileDto:CreateProfileDto,
      @UploadedFile() file) {
      return this.authService.signUp(signupDto,file);
    }

  @Post('signin')
  signIn(@Body() signinDto: SignInDto) {
    return this.authService.signIn(signinDto);
  }

  @Post('refresh')
  refresh(@Body() refreshToken: any) {
    return this.authService.refreshAccessToken(refreshToken);
  }


  @UseGuards(JwtAuthGuard)
  @Post('change')
  async changePass(@Req() req: Request, @Body() passwordDto: PasswordDto) {
    const change = await this.authService.ChangePassword(req, passwordDto);
    return change;
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
