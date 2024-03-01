import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/User/schema/User.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    console.log(username, password);

    const user = await this.userModel.findOne({ username: username });

    console.log(user);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) throw new UnauthorizedException();

    return 'login success';
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user._id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '2d' }),
    };
  }

  async refreshToken(user: User) {
    const payload = {
      username: user.username,
      sub: {
        name: user._id,
      },
    };

    return {
      accessToken:this.jwtService.sign(payload)
    }
  }
}
