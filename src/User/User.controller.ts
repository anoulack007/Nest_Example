import { Body, Controller, Get, HttpException, Param, Post, Put, UseGuards, UsePipes,ValidationPipe } from "@nestjs/common";
import { UserService } from "./User.service";
import { CreateAddressDto, CreateUserDto } from "./dto/CreateUser.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { SignUpDto } from "./dto/signup.dto";
import { LocalAuthGuard } from "src/auth/guards/local-auth.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";



@Controller('user')
export class UserController {
    constructor(private userService:UserService,
            ){}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createUser(@Body() createUserDto:CreateUserDto){
        console.log(createUserDto)
        return await this.userService.createUser(createUserDto)
    }
    @Post('address')
    // @UsePipes(new ValidationPipe())
    async createAddress(@Body() createAddressDto:CreateAddressDto){
        console.log(createAddressDto);
        return this.userService.createAddress(createAddressDto)
    }

    @Get()
    async getUser(){
        return await this.userService.getUsers();
    }

    @Get(':id')
    async getUserId(@Param('id') id:string){
        const findUser = await this.userService.getUserById(id);

        if(!findUser) throw new HttpException('User not found',404);
        return findUser
    }

    @Put(':id')
    async update(
        @Param('id')id:string,
        @Body() updateUserDto:UpdateUserDto,
        ){
        const update = await this.userService.updateUser(id,updateUserDto)

        return update
    }

    
    
    
}