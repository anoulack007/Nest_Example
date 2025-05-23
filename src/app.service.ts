import { Injectable, NestMiddleware, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import {
} from '@nestjs/platform-express';
import { PrismaClient } from '@prisma/client';


//NOTE - MongoDb connection
@Injectable()
export class MongoosesConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}
  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    return {
      uri: this.configService.get<string>('MONGODB_URI'),
    };
  }
}






