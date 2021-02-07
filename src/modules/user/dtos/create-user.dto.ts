import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'christiancastro@gmail.com' })
  @IsNotEmpty({ message: 'Informe um endereço  de email' })
  @IsEmail({}, { message: 'Informe um endereço de email válido' })
  @MaxLength(200, {
    message: 'O enderço de email deve ter menos de 200 caracteres',
  })
  email: string;


  @ApiProperty({ example: 'Christian Castro' })
  @IsNotEmpty({ message: 'Informe o nome do usuário' })
  @MaxLength(200, { message: 'O nome deve ter menos de 200 caracteres' })
  name: string;


  @ApiProperty({ example: 'Abcd_1234' })
  @IsNotEmpty({
    message: 'Informe uma senha',
  })
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+,.\\\/;':"-]).{8,}$/, {
    message: 'Deve conter pelo menos 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 numeral e 1 caractere especial',
  })
  password: string;
  

  @ApiProperty({ example: 'Abcd_1234' })
  @IsNotEmpty({
    message: 'Informe a confirmação de senha',
  })
  @MinLength(6, {
    message: 'A confirmação de senha deve ter no mínimo 6 caracteres',
  })
  passwordConfirmation: string;
}
