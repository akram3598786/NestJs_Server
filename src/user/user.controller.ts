import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { updeteUserDTO } from "./dto/update_user_dto";
import { createUserDTO } from "./dto/create_user_dto";
import { UserService } from "./user.service";
import { ParseIntPipe } from "@nestjs/common/pipes";

@Controller('/user')
export class UserController {
  /*
  private userService;
  constructor(){
   this.userService = new UserService();
  }
  we don't know weather required parameters for this dependency UuserService
  */
  // So better way to inject service as :
  constructor(private userService:UserService){}
    
  // constructor(private _userService : UserService){}
    @Get('')
    async getUser(){
      const users : any = await this.userService.get();
      if(users.length == 0) return "No user exist yet!";
      return users;
    }

    @Get('/:userId')
    async getuser(@Param('userId', new ParseIntPipe) userId: number){
      const user : any = await this.userService.getspecific(userId);
      if(!user) return "No user found!";
      return user;
    }
/*
    @Post('')
    store(@Req() req: Request){
      return this.userService.create(req.body);
    }
*/
    // OR

    // DTO : Data Transfer Object a interface or class as schema can ve user anywhere to avoid repeate code
    @Post('')
     store(@Body() createUserDTO :createUserDTO){
     return this.userService.create(createUserDTO);
    }

    @Patch('/:userId')
    updateUser(@Body() updateUserDTO:updeteUserDTO,@Param("userId", ParseIntPipe) params:{userId:number}){
      return this.userService.update(updateUserDTO,params)
    }

    @Delete('/:userId') 
     deleteUser(@Param("userId", ParseIntPipe) userId:number){
      return this.userService.delete(userId)
    }
}
