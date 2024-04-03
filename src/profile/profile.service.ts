import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './schemas/profile.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  //NOTE - Create Profile
  async create(userId:string,createProfileDto: CreateProfileDto) {
    console.log({userId,createProfileDto})
    const createProfile = await this.profileModel.create({userId,createProfileDto});

    return createProfile;
  }

  async findAll() {
    return await this.profileModel.find();
  }

  async findOne(request:any) {
    const userId  = request.user;
    console.log(userId)
    const findProfile = await this.profileModel.findOne({userId:userId.sub})

    return findProfile;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    return await this.profileModel.findByIdAndUpdate(id, updateProfileDto, {
      new: true,
    });
  }

  async remove(id: string) {
    try {
      const result = await this.profileModel.findByIdAndDelete(id);
      if (!result) {
        throw new NotFoundException(`Product with Id ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred during deletion',
      );
    }
  }
}
