import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { CredentialsDTO } from './dto/credentials.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService){}

    @Post('/signup')
    async signUp(
        @Body(ValidationPipe)createUserDTO: CreateUserDto
        ): Promise<{ message: string }>{
            await this.authService.signUp(createUserDTO);
            return{
                message: 'Cadastro realizado com sucesso'
            }
        }

    @Post('/signin')
    async signIn(
        @Body(ValidationPipe) credentialsDto: CredentialsDTO,
    ): Promise<{ token: string}>{
        return await this.authService.signIn(credentialsDto);
    }
}
