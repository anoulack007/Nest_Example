import { IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class SignUpDto {

    @IsNotEmpty()
    username: string

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsNotEmpty()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: 'Password must be minimum eight characters, at least one letter and one number.'
    })
    
    @IsNotEmpty()
    @IsString()
    password: string
}