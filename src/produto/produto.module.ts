import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoController } from './produto.controller';
//import { ProdutoRepository } from './produto.repository';
import { ProdutoService } from './produto.service';
import { ProdutoEntity } from './produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity])],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutoModule {}
