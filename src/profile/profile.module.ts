import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './schemas/profile.schema';
import { UserService } from 'src/User/User.service';
import { UserSchema } from 'src/User/schema/User.schema';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';


@Module({
  controllers: [ProfileController],
  providers: [ProfileService, UserService],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name: Profile.name,
        schema: ProfileSchema,
      },
    ]),
    ConfigModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: './src/images',
          filename: async (req, file, callBack) => {
            const fileName = path
              .parse(file.originalname)
              .name.replace(/\s/g, '');
            const extension = path.parse(file.originalname).ext;
            callBack(null, `${fileName}${extension}`);
          },
        }),
      }),
    }),
  ],
})
export class ProfileModule {}
