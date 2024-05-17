import {  Injectable  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { User } from './schema/User.schema';
import { Model } from 'mongoose';
// import { Profile } from 'src/profile/schemas/profile.schema';
// import { CreateUserDto } from './dto/CreateUser.dto';




 @Injectable()
export class UserService {
  constructor(
    // @InjectModel('User') private userModel: Model<User>,
    // @InjectModel('Profile') private profileModel: Model<Profile>,

  ) {}


  //NOTE - Read
  // async getUsers(){
  //   return await this.userModel.find().populate(['address']);
  // }

  //NOTE - ReadById
  // async getUserById(id:string){
  //   return await this.userModel.findById(id).populate(['address'])
  // }



  //NOTE - deleteUser
  // async deleteUser(id: string){
  //   return await this.userModel.findByIdAndDelete(id);
  // }

}
