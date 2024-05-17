import { ResponseUserDto } from "src/User/dto/responseUser.dto"

export class ResponseProfileDto {
    id:string
    userId:string
    firstName:string
    lastName:string
    age:string
    address:string
    avatar:string
    email:string
    images:string
    user: ResponseUserDto

    constructor(responseProfileDto:Partial<ResponseProfileDto>){
        this.firstName = responseProfileDto.firstName
        this.lastName = responseProfileDto.lastName
        this.age = responseProfileDto.age
        this.address = responseProfileDto.address
        this.avatar = responseProfileDto.avatar
        this.email = responseProfileDto.email
        this.images = responseProfileDto.images
        this.user = new ResponseUserDto(responseProfileDto.user)
    }

}