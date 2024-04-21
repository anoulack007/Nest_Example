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

  /**
   *
   * @param request
   * @param file
   * @returns
   */
  //NOTE - Update Avatar Profile
  async updateAvatar(request: any, file: Express.Multer.File) {
    const data = request.user;

    const findID = await this.profileModel.findOne({
      $or: [{ userId: data.sub }, { email: data.email }],
    });

    if (!findID) {
      console.error('Invalid Images:', findID);
      throw new BadRequestException('Invalid Images');
    }

    const updateAvatar = await this.profileModel.findByIdAndUpdate(
      { _id: findID._id },
      {
        avatar: file?.originalname ? file?.originalname : undefined,
      },
      { new: true },
    );

    return updateAvatar;
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
  async update(request: any, updateProfileDto: UpdateProfileDto,files:any) {
    const data = request.user;
    const images = [];
    const avatar = files.avatar
    
    const { firstName, lastName, age, address} =
      updateProfileDto;

    const findData = await this.profileModel.findOne({
      $or: [{ userId: data.sub }, { email: data.email }],
    });
    if (!findData) {
      throw new UnauthorizedException('Yeah Bro');
    }

    for (const i of files.images) {
      images.push(i.originalname);
    }
    console.log(avatar)
    console.log(images)

    // const update = await this.profileModel.findByIdAndUpdate(
    //   { _id: findData._id },
    //   {
    //     // avatar,
    //     firstName,
    //     lastName,
    //     age,
    //     address,
    //     // images
    //   },
    //   { new: true },
    // );

    // return update;
  }

  //NOTE - Delete
  async remove(request: any) {
    try {
      const data = request.user;
      const findData = await this.profileModel.findOne({
        $or: [{ userId: data.sub, email: data.email }],
      });

      const findUser = await this.userModel.findOne({
        $or: [{ userId: data.sub, email: data.email }],
      });

      const result = await this.profileModel.findByIdAndDelete(
        { _id: findData._id },
        { _id: findUser._id },
      );
      if (!result) {
        throw new NotFoundException(`Product with Id  not found`);
      }

      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred during deletion',
      );
    }
  }
}
