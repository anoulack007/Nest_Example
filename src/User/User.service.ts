import {  Injectable  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/User.schema';
import { Model } from 'mongoose';
import { Profile } from 'src/profile/schemas/profile.schema';
// import { CreateUserDto } from './dto/CreateUser.dto';




 @Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Profile') private profileModel: Model<Profile>,

  ) {}

  //NOTE -  createUser(Create)
  // async createUser(createUserDto: CreateUserDto) {

  //   // const profileResult = await this.profileService.findOne(
  //   //   createUserDto.profileId,
  //   // )
  //   // if(!profileResult){
  //   //   throw new NotFoundException('Profile not found');
  //   // }

  //   const hash = await bcrypt.hash(createUserDto.password, 10);

  //   const newUser = await this.userModel.create({ createUserDto,password:hash  });
    
  //   return newUser;
  // }


  //NOTE - Read
  async getUsers(){
    return await this.userModel.find().populate(['address']);
  }

  //NOTE - ReadById
  async getUserById(id:string){
    return await this.userModel.findById(id).populate(['address'])
  }



  //NOTE - deleteUser
  async deleteUser(id: string){
    return await this.userModel.findByIdAndDelete(id);
  }

  //NOTE - service about createAddress Array(relation one to many)
  // async createAddress({ userId, ...createAddressDto }: CreateAddressDto) {
    
  //   const findUser = await this.userModel.findById(userId);

  //   if (!findUser) throw new HttpException('User Not Found', 404);

  //   const newAddress = await this.addressModel.create({
  //     ...createAddressDto,
  //     userId,
  //   });

  //   await findUser.updateOne({
  //     $push: {
  //       picture: newAddress._id,
  //     },
  //   });
  //   return newAddress;
  // }


  


}
