
import { IsArray, IsInt, IsString } from "class-validator";

export class loginDTO{

    @IsString()
    email: string;

    @IsString()
    password : string;
}