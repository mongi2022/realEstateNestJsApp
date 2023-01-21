import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from '../dto/UserDTO.dto';
import { User } from '../entity/User.entiy';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly  userRepository:Repository<User>){}



    async getAllUsersService():Promise<UserDTO[]>{
  
        try {
            return await this.userRepository.find({});
          } catch (err) {
            return err;

          }      }  

    async register(userDTO:UserDTO):Promise<User>{
        const userEntity=new User();
        userEntity.email=userDTO.email
        userEntity.fullname=userDTO.fullname
        userEntity.password=userDTO.password
        const user=this.userRepository.create(userEntity)
        await this.userRepository.save(user)
        return user

    }

    async login(condition:any):Promise<User>{
        return  this.userRepository.findOneBy(condition)
      }
  
}
