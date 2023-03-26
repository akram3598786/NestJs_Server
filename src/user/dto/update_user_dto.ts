
import { IsArray, IsInt, IsString } from "class-validator";

export class updeteUserDTO{


    @IsString()
    name : string;

    @IsString()
    email : string;

    @IsString()
    password : string;
    
    active: boolean;


    // @IsArray()
    // products : string[];
}
