
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class UpdateProfileDto {

    @IsString()//ກວດສອບວ່າເປັນສະຕີງ
    readonly firstName:string

    @IsOptional()
    @IsString()
    readonly lastName:string

    @IsString()
    age:string
    
    @IsString()
    readonly address:string

    @IsString()
    readonly emailProfile:string

    @IsString()
    readonly image:string
//schema user------
    @IsOptional()
    avatar?: string

    @IsNotEmpty()
    username: string

    @IsString()
    @IsOptional()
    email?: string;

    @IsNotEmpty()
    @IsString()
    password: string
}
