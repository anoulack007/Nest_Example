import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/User/schema/User.schema';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './Strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema
      }
    ]),
    PassportModule,
    JwtModule.register({
      secret:process.env.ACCESS_TOKEN_SECRET,
      signOptions: {expiresIn: '1d'}
    }) 
  ],
  
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy]
})
export class AuthModule {}
