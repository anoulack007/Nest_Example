import { Body, Controller, Post, UsePipes,ValidationPipe } from "@nestjs/common";
import { UserService } from "./User.service";
import { CreateUserDto } from "./dto/CreateUser.dto";



@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post()
    @UsePipes(new ValidationPipe())
    async createUser(@Body() createUserDto:CreateUserDto){
        console.log(createUserDto)
        return await this .userService.createUser(createUserDto)
    }
}