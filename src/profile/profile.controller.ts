import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { request, Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SignUpDto } from 'src/User/dto/signup.dto';


@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}


  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get('one')
  findOne(@Req() request:Request) {
    return this.profileService.findOne(request);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }
  

/**
 * 
 * @param req 
 * @param signUpDto 
 * @param files 
 * @returns 
 */
  @Post('images')
  @UseInterceptors(FilesInterceptor('images'))
  uploadMany(@Req() request:Request,/*@Body() signUpDto:SignUpDto ,*/@UploadedFiles() files: Array<Express.Multer.File>){
    return this.profileService.upload(request,/*signUpDto,*/files)
  }
}
