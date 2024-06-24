import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}
  @Post()
  async criaProduto(@Body() dadosProduto) {
    this.produtoRepository.salvarProduto(dadosProduto);
    return dadosProduto;
  }
  @Get()
  async listaProdutos() {
    return this.produtoRepository.listarProdutos();
  }
}
