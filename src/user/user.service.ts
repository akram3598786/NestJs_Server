import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDTO } from './dto/create_user_dto';
import { updeteUserDTO } from './dto/update_user_dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) { }

    get(): Promise<User[]> {
        return this.userRepo.find();
    }

    getspecific(id: number): Promise<User> {
        return this.userRepo.findOne({ where: { id } });
    }

   async getUserbyEmail(email : string){
     const user = await this.userRepo.findOne({where:{email} })
     if(!user) return {auth:false, msg:"Not Authenticated/ Dont havd an account!"};
     return {auth:true,data:user};
   }

    async create(CreateUserDTO: createUserDTO) {
        let user:any = await this.userRepo.save(CreateUserDTO);
        if (!user) return { msg: "user not creatd!" }
         delete user.password;
        return { msg: "User posted", data: user }
        //  return {msg:"I am storing data in DB",createUserDTO}
    }

    async update(updateUserDTO: updeteUserDTO, userId) {
        console.log(updateUserDTO,"/n", userId)
        const res = await this.userRepo.update(userId, updateUserDTO);
        if (res.affected === 1) return { msg: "User updated Succesfully" }
        return { msg: "User not updated!.. May be user not exist." };
        // return `updating user ID = ${params.userId}, Body : ${updateUserDTO}`
    }

    async delete(id: number) {
        const res = await this.userRepo.delete(id);
        if (res.affected === 1) return { msg: "User deleted Succesfully" }
        return { msg: "User not deleted!.. May be user not exist." };
    }
}


// Without TypeORM Entity
/*
@Injectable()
export class UserService {

    get(){
        return {name : "I am Akram"}
    }

    getspecific(id:number){
        return {userid : id, msg:'Specific user'}
    }

    create(createUserDTO : createUserDTO){
        return {msg:"I am storing data in DB",createUserDTO}
    }
    update(updateUserDTO : updeteUserDTO,params:any){
        return `updating user ID = ${params.userId}, Body : ${updateUserDTO}`
    }

    delete(id:number){
        return `dleteing user ID = ${id}`
    }
}

*/