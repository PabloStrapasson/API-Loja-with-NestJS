export class ListaCaracteristicasProdutoDTO {
  nome: string;
  descricao: string;
}

export class ListaImagemProdutoDTO {
  url: string;
  descricao: string;
}

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
