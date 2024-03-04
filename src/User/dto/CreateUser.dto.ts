import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  @Type(()=>CreateAddressDto)
  address?: string[];
}



export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  province: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  district: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  village: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
