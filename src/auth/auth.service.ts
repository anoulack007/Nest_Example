import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/User/schema/User.schema';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from 'src/User/dto/signin.dto';
import { ConfigService } from '@nestjs/config';
import { PasswordDto } from 'src/User/dto/password.dto';

import { Profile } from 'src/profile/schemas/profile.schema';
import { ProfileService } from 'src/profile/profile.service';
import { SignUpDto } from 'src/User/dto/signup.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Profile') private profileModel: Model<Profile>,
    private profileService: ProfileService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   *
   * @param signUpDto
   * @param createProfileDto
   * @param file
   * @returns
   */
  //NOTE - register
  async signUp(signUpDto: SignUpDto, file: any) {
    
    const {
      username,
      password,
      email,
      firstName,
      lastName,
      age,
      address,
    } = signUpDto;

    const hashPassword = await bcrypt.hash(password, 10);

    const findEmail = await this.userModel.findOne({ email });
    if (findEmail) {
      throw new BadRequestException('Email Ready exist');
    }

    const user = await this.userModel.create({
      avatar: file?.originalname ? file?.originalname : undefined,
      username,
      email,
      password: hashPassword,
    });

    const profile = await this.profileModel.create({
      userId: user._id,
      firstName,
      lastName,
      age,
      address,
      email,
      image: file?.originalname ? file?.originalname : undefined,
    });

    return { user, profile };
  }

  /**
   *
   * @param signinDto
   * @returns
   */
  //NOTE - function Login
  async signIn(signinDto: SignInDto) {
    const { username, password, email } = signinDto;

    let data:any

    data = await this.userModel.findOne({ $or:[{username},{email}] });
    // if(!data){  data = await this.userModel.findOne({ email });}

    
    if (!data) {
      console.error('Invalid user:', data);
      throw new BadRequestException('Invalid user');
    }

      const isMatch = await bcrypt.compare(password, data.password);

      if (isMatch === false) {
        throw new UnauthorizedException('Invalid credentials');
      }

    const payload = {
      email: data.email ,
      sub: data._id,
    };

    const access_token = await this.jwtService.signAsync(payload);
  
    //FIXME - fixleo - expires in .env
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.EXPIRES,
      secret: process.env.REFRESH_TOKEN_SECRET,
    });

    return { access_token, refresh_token };

  }

  //NOTE POST /auth/refresh
  async refreshAccessToken(refreshToken: any) {
    const refresh = refreshToken.payload;

    const payload = this.jwtService.verify(refresh, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
    });

    const newAccessToken = await this.jwtService.signAsync({
      email: payload.email,
      sub: payload.sub,
    });

    const newRefreshToken = await this.jwtService.signAsync(
      { email: payload.email, sub: payload.sub },
      {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        expiresIn: '1d',
      },
    );

    return {
      newAccessToken,
      newRefreshToken,
    };
  }

  /**
   *
   * @param request
   * @param passwordDto
   */
  async ChangePassword(request: any, passwordDto: PasswordDto) {
    const { sub } = request.user;
    const PassChange = await this.userModel.findById({ _id: sub });
    if (!PassChange) {
      console.error('Invalid PassChange:', PassChange);
      throw new BadRequestException('Invalid PassChange');
    }

    const comparePass = await bcrypt.compare(
      passwordDto.oldPassword,
      PassChange.password,
    );
    if (!comparePass) {
      throw new BadRequestException('Fail Change Password');
    }

    const password = await bcrypt.hash(passwordDto.newPassword, 10);
    await this.userModel.findByIdAndUpdate({ _id: sub }, { password });
    throw new HttpException('Change Success', HttpStatus.ACCEPTED);
  }
}
