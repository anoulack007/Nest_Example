import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors, UsePipes,ValidationPipe } from "@nestjs/common";
import { UserService } from "./User.service";
import { CreateAddressDto, CreateUserDto } from "./dto/CreateUser.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { SignUpDto } from "./dto/signup.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";
import { callbackify } from "util";
import { Request } from "express";



@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(
        private userService:UserService,

            ){}

    @Post()
    async createUser(@Body() createUserDto:CreateUserDto){
        console.log(createUserDto)
        return await this.userService.createUser(createUserDto)
    }


    @Post('address')
    async createAddress(@Body() createAddressDto:CreateAddressDto){
        console.log(createAddressDto);
        return this.userService.createAddress(createAddressDto)
    }


    @Get()
    async getUser(@Req() req:Request){
        console.log(req.user)
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

    @Delete(':id')
    async remove(
        @Param('id')id:string
    ){
        const removes = await this.userService.deleteUser(id)

        return removes
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('image',{
        storage:diskStorage({
            destination:"./src/Images",
            filename:(req,file, callBack)=>{
                const fileName = path.parse(file.originalname).name.replace(/\s/g,'')+Date.now();
                const extension = path.parse(file.originalname).ext;
                callBack(null, `${fileName}${extension}`);
            }
        })
    }))
    uploadFile(@Res() res,@UploadedFile() file,@Body() avatar:string){
        return res.status(HttpStatus.OK).json({
            avatar,
            success: true,
            data: file.path
        })
    }
    
}