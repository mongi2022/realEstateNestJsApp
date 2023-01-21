import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from '../dto/UserDTO.dto';
import { User } from '../entity/User.entiy';
import { UserService } from '../service/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express'
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
        private jwtService: JwtService) { }


    @Get()
    async getAllUsersController(): Promise<UserDTO[]> {
        return await this.userService.getAllUsersService()
    }


    @Post('register')
    async register(@Body() userDTO: UserDTO): Promise<User> {
        const password = userDTO.password;
        const hashedPassword = await bcrypt.hash(password, 12)
        userDTO.password = hashedPassword
        const result = { password, ...userDTO }

        return this.userService.register(userDTO)
    }


    @Post('login')
    async login(@Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response) {
        const user = await this.userService.login({ email })

        if (!user)
            throw new BadRequestException('invalid credentials')

        if (!await bcrypt.compare(password, user.password))
            throw new BadRequestException('invalid credentials')

        const jwt = await this.jwtService.signAsync({ id: user.id ,fullname:user.fullname})
        response.cookie('jwt', jwt, { httpOnly: true })
        return {
            message: 'success',
            access_token: jwt
        };
    }
    @Get('user')
    async user(@Req() request:Request){
        try{

      
 const cookie=request.cookies['jwt']
 const data = await this.jwtService.verifyAsync(cookie)
 if(!data)  {
    throw new UnauthorizedException()
 }
 const user=await this.userService.login({id:data['id']})
const {password,...result}=user
 return result; 
 }catch(e){
    throw new UnauthorizedException()
 }


    }  
    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt')
        return {
            message: 'success'
        }
    }
}
