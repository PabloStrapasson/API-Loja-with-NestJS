import { ListaCaracteristicasProdutoDTO } from './caracteristicaProduto.dto';
import { ListaImagemProdutoDTO } from './imagemProduto.dto';

export class ListaProdutoDTO {
  id: string;
  usuarioId: string;
  nome: string;
  valor: number;
  quantidade: number;
  descricao: string;
  categoria: string;
  caracteristicas: ListaCaracteristicasProdutoDTO[];
  imagens: ListaImagemProdutoDTO[];
}
