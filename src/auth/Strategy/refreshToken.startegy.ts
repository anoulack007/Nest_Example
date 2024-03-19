// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { DotenvConfigOutput } from 'dotenv';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// const dotenvConfig: DotenvConfigOutput = require('dotenv').config();

// @Injectable()
// export class RefreshJwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private configService: ConfigService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
//       signOptions: {expiresIn: '3d'}
      // secretOrKey: process.env.REFRESH_TOKEN_SECRET,
//     });
//   }
//   async validate(payload: any) {
//     return { _id: payload.sub, email: payload.email };
//   }
// }
