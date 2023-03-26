import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { User } from "./user/entity/user.entity";
import { UserModule } from "./user/user.module";
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule, JwtService } from "@nestjs/jwt";


@Module({
    controllers: [AppController, AuthController],
    imports: [
        UserModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: 'akram3598',
            database: 'nestjs',
            entities: [User],
            synchronize: true,
          }),
        AuthModule,
        JwtModule
    ],
    providers: [AuthService,JwtService]
})
export class AppModule { }