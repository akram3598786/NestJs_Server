import { Controller, Get, Param, Post, Req } from "@nestjs/common";
import { Delete, Patch } from "@nestjs/common/decorators";
import { Request } from "express";


@Controller('app')
export class AppController{

    @Get('')
    getUser(){
        return {name : "I am Akram"}
    }

    @Get('/:userId')
    getuser(@Param() params:{userId: number}){
      return params.userId;
    }

    @Post('/post')
    store(@Req() req: Request){
        return {msg:"I am storing data in DB",data:req.body}
    }

    @Patch('/:userId')
    updateUser(@Param() params:{userId:number}){
      return `updating user ID = ${params.userId}`
    }

    @Delete('/:userId')
    deleteUser(@Param() params:{userId:number}){
      return `dleteing user ID = ${params.userId}`
    }

}