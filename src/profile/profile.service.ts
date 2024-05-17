import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './schemas/profile.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from 'src/User/dto/signup.dto';
import { User } from 'src/User/schema/User.schema';
import * as fs from 'fs';
import { existsSync, unlinkSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  /**
   *
   * @param request
   * @param files
   * @returns
   */
  //NOTE - Upload Picture - Array One to many
  async upload(request: any, files: any) {
    const data = request.user;
    const images = [];

    const findID = await this.profileModel.findOne({
      $or: [{ userId: data.sub }, { email: data.email }],
    });

    if (!findID) {
      console.error('Invalid Images:', findID);
      throw new BadRequestException('Invalid Images');
    }

    for (const i of files) {
      images.push(i.originalname);
    }

    const PicMany = await this.profileModel.findByIdAndUpdate(
      { _id: findID._id },
      { images: images },
      { new: true },
    );

    return PicMany;
  }


  //   return createProfile;
  // }
  //NOTE - FInd All
  async findAll() {
    return await this.profileModel.find();
  }

  //NOTE - findOne
  async findOne(request: any) {
    const userId = request.user;
    const findProfile = await this.profileModel.findOne({ userId: userId.sub });

    return findProfile;
  }

  //NOTE - update
  async update(request: any, updateProfileDto: UpdateProfileDto, files: any) {
    const data = request.user;
    const images = [];
    let avatar1;

    const { firstName, lastName, age, address } = updateProfileDto;

    const findData = await this.profileModel.findOne({
      $or: [{ userId: data.sub }, { email: data.email }],
    });


    if (!findData) {
      throw new UnauthorizedException('Yeah Bro');
    }

    if (files.images) {
      for (const i of findData.images) {
        if (existsSync('./src/Images/' + i)) {
          unlinkSync('./src/Images/' + i);
          console.log('Delete Success');
        } else {
          console.log('File not found');
        }
      }

      for (const i of files.images) {
        images.push(i.originalname);
      }
    }
    if (files.avatar) {
      avatar1 = files.avatar[0].originalname;
      if (existsSync('./src/Images/' + findData.avatar)) {
        unlinkSync('./src/Images/' + findData.avatar);
        console.log('Delete Success');
      } else {
        console.log('File not found');
      }
    }

    const update = await this.profileModel.findByIdAndUpdate(
      { _id: findData._id },
      {
        avatar: avatar1,
        firstName,
        lastName,
        age,
        address,
        images,
      },
      { new: true },
    );
    


    return update;
  }

  //NOTE - Delete
  async remove(request: any) {
    const data = request.user;

    const findProfile = await this.profileModel.findOne({
      $or: [{ userId: data.sub, email: data.email }],
    });

    const findUser = await this.userModel.findOne({ email: data.email });

    if (!findProfile || !findUser) {
      throw new NotFoundException(`Profile or User not found`);
    }

    for (const i of findProfile.images) {
      if (existsSync('./src/Images/'+ i)) {
        unlinkSync('./src/Images/' + i);
        console.log('Delete Success');
      } else {
        console.log('File Not Found');
      }
    }

    if (existsSync('./src/Images/' + findProfile.images)) {
      console.log(findProfile.images);
      unlinkSync('./src/Images/' + findProfile.images);
      console.log('Delete Success');
    } else {
      console.log('File not found');
    }

    if (existsSync('./src/Images/' + findProfile.avatar)) {
      unlinkSync('./src/Images/' + findProfile.avatar);
      console.log('Delete Success');
    } else {
      console.log('File not found');
    }

    if (findProfile._id && findUser._id) {
    const deleteProfile = await this.profileModel.findByIdAndDelete(
      findProfile._id,
    );
    const deleteUser = await this.userModel.findByIdAndDelete(findUser._id);

    return { deletedProfile: deleteProfile, deletedUser: deleteUser };
    }
  }
}
