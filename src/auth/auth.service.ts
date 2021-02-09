import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { UserRole } from 'src/modules/user/enum/user-roles.enum';
import { UserRepository } from 'src/modules/user/repositories/user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository :UserRepository
    ){}

    async signUp(createUserDTO: CreateUserDto): Promise<User>{
        if(createUserDTO.password != createUserDTO.passwordConfirmation){
            throw new UnprocessableEntityException('As senhas estão diferentes');
        }else{
            return await this.userRepository.createUser(createUserDTO, UserRole.USER);
        }
    }
}
