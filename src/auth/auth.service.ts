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
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,

  ) {}

  async validateUser(signinDto: SignInDto): Promise<any> {
    const {email, password} = signinDto
    console.log(email,password)

    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const {...result } = user;
      return result;
    }

    return null;
  }

  async signUp(signUpDto: SignUpDto) {
    try {
      const { username, password,email } = signUpDto;

      console.log({ username, password })
      const hashPassword = await bcrypt.hash(password, 10);

      const user = this.userModel.create({
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

  async signIn(signinDto: SignInDto) {

    const {email,password} = signinDto

    const user = await this.userModel.findOne({email});

    if (!user) {
      console.error('Invalid user:', user);
      throw new BadRequestException('Invalid user');
    }

    
    if (user) {
      // console.log(user);
      
      const isMatch = await bcrypt.compare(password,user.password);
      
      // console.log(isMatch);
      
      if (isMatch === false) {
        throw new UnauthorizedException('Invalid credentials');
      }
    }

    console.log(user);
    
    const payload = {
      email: user.email,
      sub: user._id,
    };
    console.log(payload)

    const access_token = await this.jwtService.signAsync(payload);

    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
      secret: process.env.REFRESH_TOKEN_SECRET,
    });

    return { access_token, refresh_token };

    // return{
    //   accessToken:this.jwtService.sign(payload),
    //   refreshToken:this.jwtService.sign(payload)
    // }
  }
}
