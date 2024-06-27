import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  IsUrl,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProdutoEntity } from '../produto.entity';

export class CaracteristasProdutoDTO {
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
  descricao: string;

  produto: ProdutoEntity;
}

export class ImagemProdutoDTO {
  id: string;

  @IsUrl(undefined, { message: 'A url informada não é valida' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
  descricao: string;

  produto: ProdutoEntity;
}

export class CriaProdutoDTO {
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  idUsuario: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsNumber(undefined, { message: 'O valor deve ser um número ' })
  @IsPositive({ message: 'O valor precisa ser maior que 0' })
  valor: number;

  @IsNumber(undefined, { message: 'O valor deve ser um número ' })
  @Min(0, { message: 'Quantidade mínima inválida' })
  quantidade: number;

  @IsString()
  @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
  @MaxLength(1000, {
    message: 'Descrição não pode ter mais que 1000 caracteres',
  })
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CaracteristasProdutoDTO)
  caracteristicas: CaracteristasProdutoDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];

  @IsString()
  @IsNotEmpty({ message: 'A categoria do produto não pode ser vazia' })
  categoria: string;
}
