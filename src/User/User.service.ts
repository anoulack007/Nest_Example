import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/User.schema';
import { Model } from 'mongoose';
import { Address } from './schema/Address.schema';
import * as bcrypt from 'bcrypt'
import { CreateAddressDto, CreateUserDto } from './dto/CreateUser.dto';



@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Address') private addressModel: Model<Address>,
    
  ) {}

  //NOTE -  createUser(Create)
  async createUser({ ...createUserDto }: CreateUserDto) {

    const hash = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.userModel.create({ ...createUserDto,password:hash  });
    
    return newUser;
  }


  //NOTE - Read
  async getUsers(){
    return await this.userModel.find().populate(['address']);
  }

  //NOTE - ReadById
  async getUserById(id:string){
    return await this.userModel.findById(id).populate(['address'])
  }

  //NOTE - Update
//   async updateUser( id:string, createUserDto: CreateUserDto ){
//     return await this.userModel.findByIdAndUpdate(id,createUserDto,{new:true})
//   }

  //NOTE - deleteUser
  async deleteUser(id: string){
    return await this.userModel.findByIdAndDelete(id);
  }

  //NOTE - service about createAddress Array(relation one to many)
  async createAddress({ userId, ...createAddressDto }: CreateAddressDto) {
    const findUser = await this.userModel.findById(userId);

    if (!findUser) throw new HttpException('User Not Found', 404);

    const newAddress = await this.addressModel.create({
      ...createAddressDto,
      userId,
    });

    await findUser.updateOne({
      $push: {
        address: newAddress._id,
      },
    });
    return newAddress;
  }
}
