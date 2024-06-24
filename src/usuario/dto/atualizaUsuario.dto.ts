import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { EmailUnico } from '../validacao/emailUnicoValidator';

export class AtualizaUsuarioDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsOptional()
  @IsEmail(undefined, { message: 'O email informado é inválido' })
  @EmailUnico({ message: 'Já existe um usuario com este e-mail' })
  email: string;

  @IsOptional()
  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  senha: string;
}
