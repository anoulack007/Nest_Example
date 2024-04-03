import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProfileDto {

    
    @IsString()//ກວດສອບວ່າເປັນສະຕີງ
    readonly firstName:string

    @IsOptional()
    @IsString()
    readonly lastName:string

    @IsOptional()
    @IsString()
    age:string
    
    @IsOptional()
    @IsString()
    readonly address:string


    @IsOptional()
    @IsString()
    readonly image:string
//schema user------
    @IsOptional()
    avatar?: string

    @IsOptional()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsOptional()
    email?: string;

    @IsNotEmpty()
    @IsString()
    password: string

}
