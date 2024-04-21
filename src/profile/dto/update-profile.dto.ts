
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class UpdateProfileDto {

    @IsOptional()
    avatar?: string

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
    readonly images:string
    
}
