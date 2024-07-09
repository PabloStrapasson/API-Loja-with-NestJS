import {
  //ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
//import { UsuarioRepository } from '../usuario.repository';
import { UsuarioService } from '../usuario.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUnicoValidator implements ValidatorConstraintInterface {
  constructor(private usuarioService: UsuarioService) {}

  async validate(value: any): Promise<boolean> {
    try {
      const usuarioExiste = await this.usuarioService.existeEmail(value);
      return !usuarioExiste;
    } catch (erro) {
      if (erro instanceof NotFoundException) {
        return true;
      }

      throw erro;
    }
  }
}

export const EmailUnico = (opcoesValidacao: ValidationOptions) => {
  return (obj: object, prop: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: prop,
      options: opcoesValidacao,
      constraints: [],
      validator: EmailUnicoValidator,
    });
  };
};
