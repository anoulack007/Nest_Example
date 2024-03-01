import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/User/schema/User.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private authService: AuthService
    ) {
    super();
  }

  async validate(username:string, password:string){
    const user = await this.authService.validateUser(username,password);
    if(!user){
        throw new UnauthorizedException()
    }
    return user
    }
}