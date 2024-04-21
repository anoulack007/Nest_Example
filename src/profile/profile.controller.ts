import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UploadedFiles, UseInterceptors, Put, UploadedFile } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { request, Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { SignUpDto } from 'src/User/dto/signup.dto';


@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService,

  ) {}


  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get('one')
  findOne(@Req() request:Request) {
    return this.profileService.findOne(request);
  }

  /**
   * 
   * @param request 
   * @param updateProfileDto 
   * @param files 
   */
  @Patch()
  @UseInterceptors(FileFieldsInterceptor([
    {name:'avatar'},
    {name:'images'}
  ]))
  update(@Req() request:Request, @Body() updateProfileDto: UpdateProfileDto,@UploadedFiles() files:{avatar?:Express.Multer.File,images?:Express.Multer.File[]}) {

    return this.profileService.update(request, updateProfileDto,files);
  }

  @Delete()
  remove(@Req() request:Request) {
    return this.profileService.remove(request);
  }
  

/**
 * 
 * @param req 
 * @param signUpDto 
 * @param files 
 * @returns 
 */
  @Put('images')
  @UseInterceptors(FilesInterceptor('images'))
  uploadMany(@Req() request:Request,/*@Body() signUpDto:SignUpDto ,*/@UploadedFiles() files: Array<Express.Multer.File>){
    return this.profileService.upload(request,/*signUpDto,*/files)
  }

  @Put('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateAvatar(@Req() request:Request, @UploadedFile() file:Express.Multer.File){
    return await this.profileService.updateAvatar(request,file)
    
  }


}
