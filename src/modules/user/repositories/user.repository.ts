import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRole } from '../enum/user-roles.enum';
import { User } from '../../../entities/user.entity';

import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CredentialsDTO } from 'src/auth/dto/credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(
    createUserDto: CreateUserDto,
    role: UserRole,
  ): Promise<User> {
    const { email, name, password } = createUserDto;

    const user = this.create();
    user.email = email;
    user.name = name;
    user.role = role;
    user.status = true;
    user.confirmationToken = crypto.randomBytes(32).toString('hex');
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      delete user.password;
      delete user.salt;
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Endereço de email já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário no banco de dados',
        );
      }
    }
  }

   async checkCredentials(credentialsDto: CredentialsDTO): Promise<User>{
    const { email, password } = credentialsDto;
    const user = await this.findOne({ email, status: true })

    if(user && (await user.checkPassword(password))){
      return user;
    }else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
