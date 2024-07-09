import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CriaProdutoDTO } from './dto/criaProduto.dto';
import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';
import { ProdutoService } from './produto.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ProdutoEntity } from './produto.entity';

@Controller('/produtos')
export class ProdutoController {
  constructor(
    private produtoService: ProdutoService,
    @Inject(CACHE_MANAGER) private gerenciadorDeCache: Cache,
  ) {}
  @Post()
  async criaProduto(@Body() dadosProduto: CriaProdutoDTO) {
    const produtoCadastrado =
      await this.produtoService.criaProduto(dadosProduto);

    return {
      mensagem: 'Produto criado com sucesso.',
      produto: produtoCadastrado,
    };
  }
  @Get()
  @UseInterceptors(CacheInterceptor)
  async listaProdutos() {
    return await this.produtoService.listaProdutos();
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async buscaProdutoPorId(@Param('id') id: string) {
    let produto = await this.gerenciadorDeCache.get<ProdutoEntity>(
      `produto-${id}`,
    );

    if (!produto) {
      console.log('Obtendo produto do cache!');
      produto = await this.produtoService.buscaProdutoId(id);

      await this.gerenciadorDeCache.set(`produto-${id}`, produto);
    }

    return {
      mensagem: 'Produto obtido com sucesso.',
      produto,
    };
    /* Antigo
    const produto = await this.produtoService.buscaProdutoId(id);

    return {
      mensagem: 'Produto encontrado.',
      produto,
    };
    */
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosProduto: AtualizaProdutoDTO,
  ) {
    const produtoAlterado = await this.produtoService.atualizaProduto(
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
    const produtoRemovido = await this.produtoService.deletaProduto(id);

    return {
      mensagem: 'produto removido com sucesso',
      produto: produtoRemovido,
    };
  }
}
