import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoosesConfigService } from './app.service';
import { UserModule } from './User/User.module';

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
  UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
