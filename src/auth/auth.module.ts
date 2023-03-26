import {  Module } from '@nestjs/common';
import { JwtModule} from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './jwtConstants';
import { LocalStrategy } from './local.strategy';

@Module({
    controllers : [AuthController],
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
        //  secret:"jwtConstantssecret",
         secret:jwtConstants.secret,
         signOptions: {expiresIn:'60s'},
        })
    ],
    providers:[AuthService,LocalStrategy],
     exports:[AuthService],

})
export class AuthModule { }
