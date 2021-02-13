import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { UserRole } from 'src/modules/user/enum/user-roles.enum';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { CredentialsDTO } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository :UserRepository,
        private jwtService: JwtService,
    ){}

    async signUp(createUserDTO: CreateUserDto): Promise<User>{
        if(createUserDTO.password != createUserDTO.passwordConfirmation){
            throw new UnprocessableEntityException('As senhas estão diferentes');
        }else{
            return await this.userRepository.createUser(createUserDTO, UserRole.USER);
        }
    }

    async signIn(credentialsDto: CredentialsDTO){
        const user = await this.userRepository.checkCredentials(credentialsDto);

        if(user === null){
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const jwtPayload = {
            id: user.id,
        }

        const token = await this.jwtService.sign(jwtPayload);

        return { token };
    }
}
