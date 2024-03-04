import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/User/schema/User.schema';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './Strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './Strategy/jwt.strategy';
import { RefreshJwtStrategy } from './Strategy/refreshToken.startegy';
import { UserService } from 'src/User/User.service';
import { AddressSchema } from 'src/User/schema/Address.schema';



@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema
      },
      {
        name:'Address',
        schema:AddressSchema
      }
    ]),
    PassportModule,
    JwtModule.register({
      secret:process.env.ACCESS_TOKEN_SECRET,
      signOptions: {expiresIn: '1d'}
    }) 
  ],
  
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy,UserService,RefreshJwtStrategy]
})
export class AuthModule {}
