import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { ResponseUserDTO } from './dtos/response-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor( private userService: UserService ){}

    @Post()
    async createAdminUser(
        @Body() createUserDto: CreateUserDto,
    ): Promise<ResponseUserDTO>{
        const user = await this.userService.
    }
}
