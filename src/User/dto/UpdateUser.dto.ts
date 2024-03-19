import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;
  
    @IsString()
    @IsOptional()
    lastName?: string;
  
  
    @IsOptional()
    @IsString()
    @Type(()=>UpdateAddressDto)
    address?: string[];
}

export class UpdateAddressDto{
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