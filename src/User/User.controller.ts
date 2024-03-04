import { Body, Controller, Get, HttpException, Param, Post, Put, UsePipes,ValidationPipe } from "@nestjs/common";
import { UserService } from "./User.service";
import { CreateAddressDto, CreateUserDto } from "./dto/CreateUser.dto";



@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post()
    // @UsePipes(new ValidationPipe())
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
        @Body() createUserDto:CreateUserDto,
        ){
        const update = await this.userService.updateUser(id,createUserDto)

        return update
    }


    //NOTE - delete
    
    
    
}