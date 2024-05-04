import {
  BadRequestException,
  HttpCode,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
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


  //NOTE - Create Profile
  // async create(userId: string, createProfileDto: CreateProfileDto) {
  //   console.log({ userId, createProfileDto });
  //   const createProfile = await this.profileModel.create({
  //     userId,
  //     createProfileDto,
  //   });

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
    const avatar = files.avatar;
    const avatar1 = avatar[0].originalname;

    const { firstName, lastName, age, address } = updateProfileDto;

    const findData = await this.profileModel.findOne({
      $or: [{ userId: data.sub }, { email: data.email }],
    });
    if (!findData) {
      throw new UnauthorizedException('Yeah Bro');
    }

    for (const i of files.images) {
      images.push(i.originalname);
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

    const findData = await this.profileModel.findOne({
      $or: [{ userId: data.sub, email: data.email }],
    });

    const findUser = await this.userModel.findOne({email: data.email,});


    if (!findData || !findUser) {
      throw new NotFoundException(`Profile or User not found`);
    }

    if (findData._id && findUser._id) {
      const deleteProfile = await this.profileModel.findByIdAndDelete(findData._id);
      const deleteUser = await this.userModel.findByIdAndDelete(findUser._id);

      return { deletedProfile: deleteProfile, deletedUser: deleteUser };
    }

  }
}
