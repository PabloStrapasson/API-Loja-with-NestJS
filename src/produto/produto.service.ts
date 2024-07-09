import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { ListaProdutoDTO } from './dto/listaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';
import { CriaProdutoDTO } from './dto/criaProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepoditory: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(produtoDTO: CriaProdutoDTO) {
    const produto = new ProdutoEntity();

    Object.assign(produto, produtoDTO as ProdutoEntity);

    return await this.produtoRepoditory.save(produto);
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
    const produto = await this.produtoRepoditory.findOneBy({ id });

    if (produto === null) {
      throw new NotFoundException('Produto não encontrado!');
    }

    Object.assign(produto, novoProduto as ProdutoEntity);

    return this.produtoRepoditory.save(produto);
  }

  async deletaProduto(id: string) {
    const resultado = await this.produtoRepoditory.delete(id);

    if (!resultado.affected) {
      throw new NotFoundException('Produto não encontrado');
    }
  }
}
