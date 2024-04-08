import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './schemas/profile.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from 'src/User/dto/signup.dto';


@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

    //NOTE - Upload Picture - Array One to many
    async upload(request:any,files:any,){
      const data = request.user;
      
      const image = []

      const findID = await this.profileModel.findOne({userId:data.sub});

      
      if(!findID){
        console.error('Invalid Images:',findID);
        throw new BadRequestException('Invalid Images')
      }

      for (const i of files){image.push(i.originalname)}
      
      console.log(image)

      // const PicMany = await this.profileModel.findByIdAndUpdate({_id:findID._id},{image:image})

      // return PicMany 


    }


  //NOTE - Create Profile
  async create(userId:string,createProfileDto: CreateProfileDto) {
    console.log({userId,createProfileDto})
    const createProfile = await this.profileModel.create({userId,createProfileDto});

    return createProfile;
  }
//NOTE - FInd All
  async findAll() {
    return await this.profileModel.find();
  }
//NOTE - findOne
  async findOne(request:any) {
    const userId  = request.user;
    console.log(userId)
    const findProfile = await this.profileModel.findOne({userId:userId.sub})

    return findProfile;
  }

  //NOTE - update
  async update(id: string, updateProfileDto: UpdateProfileDto) {
    return await this.profileModel.findByIdAndUpdate(id, updateProfileDto, {
      new: true,
    });
  }

  //NOTE - Delete
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
