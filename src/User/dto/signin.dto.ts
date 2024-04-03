import { IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class SignInDto {

    @IsString()
    @IsOptional()
    username?: string;

    @IsString()
    @IsOptional()
    email?: string;


    @IsNotEmpty()
    @IsString()
    password: string
}