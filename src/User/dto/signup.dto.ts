import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SignUpDto {

    @IsOptional()
    userId:string

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