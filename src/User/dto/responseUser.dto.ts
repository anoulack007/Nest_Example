export class ResponseUserDto{
    id:string
    username: string
    email:string
    is_active_status: boolean

    constructor(responseUserDto:Partial<ResponseUserDto>){
        this.id = responseUserDto.id
        this.username = responseUserDto.username
        this.email = responseUserDto.email
        this.is_active_status = responseUserDto.is_active_status
    }
}