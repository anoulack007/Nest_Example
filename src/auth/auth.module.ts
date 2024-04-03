import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/User/schema/User.schema';
import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '@nestjs/jwt';

import { UserService } from 'src/User/User.service';
import { SignUpDto } from 'src/User/dto/signup.dto';
import { SignInDto } from 'src/User/dto/signin.dto';
import * as dotenv from 'dotenv';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { ProfileSchema } from 'src/profile/schemas/profile.schema';
import { ProfileService } from 'src/profile/profile.service';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name:"Profile",
        schema:ProfileSchema
    },
    ]),
    MulterModule.registerAsync({
      useFactory:() =>({
        storage:diskStorage({
          destination:"./src/images",
          filename:(req,file, callBack)=>{
              const fileName = path.parse(file.originalname).name.replace(/\s/g,'')+Date.now();
              const extension = path.parse(file.originalname).ext;
              callBack(null, `${fileName}${extension}`);
          }
      })
      }),
   
    }),

    // PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],

  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    ProfileService,
    SignUpDto,
    SignInDto,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AuthModule {}
