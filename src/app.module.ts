import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoosesConfigService } from './app.service';
import { UserModule } from './User/User.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';


@Module({
  imports: 
  [
  ConfigModule.forRoot({isGlobal:true}
    ),
  // MongooseModule.forRootAsync({
  //   imports:[ConfigModule],
  //   useFactory:async (configService: ConfigService)=>({
  //     uri: configService.get<string>('MONGODB_URI'),
  //   }),
  //   inject:[ConfigService],
  // })
  MongooseModule.forRootAsync({
    useClass:MongoosesConfigService
  }),
  UserModule,
  AuthModule,
  ProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
