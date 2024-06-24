import { Injectable } from '@nestjs/common';
import { ProdutoEntity } from './produto.entity';

@Injectable()
export class ProdutoRepository {
  private produtos: ProdutoEntity[] = [];

  async salvarProduto(produto: ProdutoEntity) {
    this.produtos.push(produto);
  }

  async listarProdutos() {
    return this.produtos;
  }

  private buscarProdutoId(id: string) {
    const produto = this.produtos.find((produto) => produto.id === id);

    if (!produto) {
      throw new Error('Produto não existe');
    }

    return produto;
  }

  async atualizarProduto(id: string, dadosProduto: Partial<ProdutoEntity>) {
    const produto = this.buscarProdutoId(id);

    Object.entries(dadosProduto).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }
      produto[chave] = valor;
    });

    return produto;
  }

  async deletarProduto(id: string) {
    const produto = this.buscarProdutoId(id);
    this.produtos = this.produtos.filter(
      (produtoSalvo) => produtoSalvo.id !== id,
    );
    return produto;
  }
}
