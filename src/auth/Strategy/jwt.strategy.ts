// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { DotenvConfigOutput } from 'dotenv';


// const dotenvConfig: DotenvConfigOutput = require('dotenv').config();
// if (dotenvConfig.error) {
//     console.log(dotenvConfig)
//     throw dotenvConfig.error;
//   }


// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private configService: ConfigService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
      // secretOrKey:process.env.ACCESS_TOKEN_SECRET
//     });
//   }
//   async validate(payload: any) {
//     return {_id:payload.sub, email: payload.email};
//   }
// }
