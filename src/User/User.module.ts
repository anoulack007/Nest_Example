import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schema/User.schema";
import { UserService } from "./User.service";
import { UserController } from "./User.controller";
import { SignUpDto } from "./dto/signup.dto";
import { ProfileSchema,Profile } from "src/profile/schemas/profile.schema";
import { ProfileService } from "src/profile/profile.service";


@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:'User',
                schema:UserSchema
            },
            {
                name:"Profile",
                schema:ProfileSchema
            }
        ])
    ],
    providers:[UserService,SignUpDto],
    controllers:[UserController]
})

export class UserModule{}