import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";



@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log("Inside The Guard")

        return super.canActivate(context);
    }
    // handleRequest(err,user,info) {
    //     throw err || new UnauthorizedException()
    // }
    // return userI
}

