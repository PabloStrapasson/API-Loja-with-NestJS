import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { CriaProdutoDTO } from './dto/criaProduto.dto';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}
  @Post()
  async criaProduto(@Body() dadosProduto: CriaProdutoDTO) {
    this.produtoRepository.salvarProduto(dadosProduto);
    return dadosProduto;
  }
  @Get()
  async listaProdutos() {
    return this.produtoRepository.listarProdutos();
  }
}
