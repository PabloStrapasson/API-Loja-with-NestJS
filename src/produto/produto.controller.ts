import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { CriaProdutoDTO } from './dto/criaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { randomUUID } from 'crypto';
import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}
  @Post()
  async criaProduto(@Body() dadosProduto: CriaProdutoDTO) {
    const produto = new ProdutoEntity();
    produto.id = randomUUID();
    produto.nome = dadosProduto.nome;
    produto.idUsuario = dadosProduto.idUsuario;
    produto.valor = dadosProduto.valor;
    produto.quantidade = dadosProduto.quantidade;
    produto.descricao = dadosProduto.descricao;
    produto.categoria = dadosProduto.categoria;
    produto.caracteristicas = dadosProduto.caracteristicas;
    produto.imagens = dadosProduto.imagens;

    this.produtoRepository.salvarProduto(produto);
    return produto;
  }
  @Get()
  async listaProdutos() {
    return this.produtoRepository.listarProdutos();
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosProduto: AtualizaProdutoDTO,
  ) {
    const produtoAlterado = await this.produtoRepository.atualizarProduto(
      id,
      dadosProduto,
    );

    return {
      mensagem: 'produto atualizado com sucesso',
      produto: produtoAlterado,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const produtoRemovido = await this.produtoRepository.deletarProduto(id);

    return {
      mensagem: 'produto removido com sucesso',
      produto: produtoRemovido,
    };
  }
}
