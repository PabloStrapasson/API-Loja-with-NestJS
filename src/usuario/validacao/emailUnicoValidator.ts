import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UsuarioRepository } from '../usuario.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUnicoValidator implements ValidatorConstraintInterface {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const usuarioExiste = await this.usuarioRepository.existeEmail(value);
    return !usuarioExiste;
  }
}

export const EmailUnico = (opcoesValidacao: ValidationOptions) => {
  return (obj: Object, prop: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: prop,
      options: opcoesValidacao,
      constraints: [],
      validator: EmailUnicoValidator,
    });
  };
};
