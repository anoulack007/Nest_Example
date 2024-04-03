import { IsString } from "class-validator";



export class PasswordDto {
    
    @IsString()
    oldPassword: string

    @IsString()
    newPassword:string
}