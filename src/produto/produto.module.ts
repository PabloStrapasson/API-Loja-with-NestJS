import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ProdutoRepository } from './produto.repository';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoRepository],
})
export class ProdutoModule {}
