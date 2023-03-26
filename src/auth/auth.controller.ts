import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
constructor(private userService: UserService){}

    @Post('/login')
   async loginHandler(@Body() loginDTO : any){
        const res:any = await this.userService.getUserbyEmail(loginDTO.email);
       if(res.auth && res.data){
        if(res.data.password === loginDTO.password) return loginDTO;
        return "Incorrect password!"
       }
       return res;
    }
}
