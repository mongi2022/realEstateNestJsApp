import { Module } from '@nestjs/common';
import { User } from './entity/User.entiy';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([User]),PassportModule,  
    JwtModule.register({
        secret: 'SECRETKEY',
        signOptions: { expiresIn: '360s' },
      })],
    controllers: [UserController],
    providers: [UserService],
    
})
export class UserModule {
    
}
