import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/User.schema";
import { Model } from "mongoose";
import { Address } from "./schema/Address.schema";
import { CreateAddressDto, CreateUserDto } from "./dto/CreateUser.dto";



@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private userModel:Model<User>,
        @InjectModel('Address') private addressModel:Model<Address>,
    ){}
//NOTE - service about createAddress Array(relation one to many)
    async createAddress({ userId, ...createAddressDto}:CreateAddressDto){

        const findUser = await this.userModel.findById(userId)

        if(!findUser) throw new HttpException('User Not Found',404)

        const newAddress= await this.addressModel.create({...createAddressDto,userId})

        await findUser.updateOne({
            $push:{
                address: newAddress._id,
            }
        })
        return newAddress
    }
//NOTE -  createUser
    async createUser({...createUserDto}:CreateUserDto){
        const newUser = await this.userModel.create({...createUserDto})
        return newUser;
    }
        

}
    