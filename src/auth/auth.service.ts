import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {

    constructor(
        private userService:UserService,
        private jwtService : JwtService
        ){}

    async validateUser(email:string, password:string):Promise<any>{
        const user = await this.userService.getUserbyEmail(email);
        if(user.data && user.data.password === password ){
        //     const {password,...result} = user.data;
        //   return result;
        return user.data;
        } 
        return null;
    }

    async login(user:any){
      const payload:any= {useremail:user.email,userId:user.id};
      console.log("Payload", payload)
      return{
        access_token : this.jwtService.sign(payload)
      }
    }
}
