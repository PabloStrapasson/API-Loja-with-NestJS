import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ImagemProdutoDTO {
  @IsUrl(undefined, { message: 'A url informada não é valida' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
  descricao: string;
}

export class ListaImagemProdutoDTO {
  url: string;
  descricao: string;
}
