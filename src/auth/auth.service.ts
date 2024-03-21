import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/User/schema/User.schema';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/User/User.service';
import { SignUpDto } from 'src/User/dto/signup.dto';
import { SignInDto } from 'src/User/dto/signin.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  //NOTE - register
  async signUp(signUpDto: SignUpDto, file:string) {
    try {
      const { username, password, email ,} = signUpDto;


      console.log({ username, password });
      const hashPassword = await bcrypt.hash(password, 10);

      const user = this.userModel.create({
        avatar:file,
        username,
        email,
        password: hashPassword,
      });
      return user;
    } catch (e) {
      throw new ConflictException({
        message: ['Username has been already using.'],
      });
    }
  }

  //NOTE - function Login
  async signIn(signinDto: SignInDto) {
    const { email, password } = signinDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      console.error('Invalid user:', user);
      throw new BadRequestException('Invalid user');
    }

    if (user) {
      // console.log(user);

      const isMatch = await bcrypt.compare(password, user.password);

      // console.log(isMatch);

      if (isMatch === false) {
        throw new UnauthorizedException('Invalid credentials');
      }
    }

    const payload = {
      email: user.email,
      sub: user._id,
    };

    const access_token = await this.jwtService.signAsync(payload);

    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
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
}
