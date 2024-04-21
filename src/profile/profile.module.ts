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

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name: Profile.name,
        schema: ProfileSchema
    },
  ]),
  MulterModule.registerAsync({
    useFactory:() =>({
      // storage:diskStorage({
      //   destination:"./src/images",
      //   filename:(req,file, callBack)=>{
      //       const fileName = path.parse(file.originalname).name.replace(/\s/g,'')+Date.now();
      //       const extension = path.parse(file.originalname).ext;
      //       callBack(null, `${fileName}${extension}`);
      //   }
    // })
    }),
 
  })
  ],
  controllers: [ProfileController],
  providers: [ProfileService,UserService],
})
export class ProfileModule {}
