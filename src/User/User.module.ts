import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schema/User.schema";
import { UserService } from "./User.service";
import { UserController } from "./User.controller";
import { AddressSchema } from "./schema/Address.schema";

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:'User',
                schema:UserSchema
            },
            {
                name:'Address',
                schema:AddressSchema
            }
        ])
    ],
    providers:[UserService],
    controllers:[UserController]
})

export class UserModule{}