import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { ListaProdutoDTO } from './dto/listaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepoditory: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(produto: ProdutoEntity) {
    await this.produtoRepoditory.save(produto);
  }

  async listaProdutos() {
    const produtos = await this.produtoRepoditory.find();
    /*
    const listaProdutos = produtos.map(
      (produto) => new ListaProdutoDTO(produto.id, produto.usuarioId, produto.nome, produto.valor, produto.quantidade, produto.descricao, produto.categoria ),
    );
    */

    return produtos;
  }

  async atualizaProduto(id: string, novoProduto: AtualizaProdutoDTO) {
    await this.produtoRepoditory.update(id, novoProduto);
  }

  async deletaProduto(id: string) {
    await this.produtoRepoditory.delete(id);
  }
}
