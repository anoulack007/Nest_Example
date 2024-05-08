import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import {
} from '@nestjs/platform-express';


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

export class FileValidatorService {
  validateFile(file: any): boolean {
    // Custom validation logic
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      throw new Error('Only image files are allowed!');
    }
    if (file.size > 1024 * 1024) {
      throw new Error('File size should be less than 1MB');
    }
    return true;
  }
}


