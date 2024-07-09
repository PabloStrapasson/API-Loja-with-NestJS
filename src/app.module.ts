import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { PostgresConfigService } from './config/postgres.config.service';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { ProdutoModule } from './modulos/produto/produto.module';
import { PedidoModule } from './modulos/pedido/pedido.module';
import { FiltroExcecao } from './recursos/filtros/filtroExcecao';

@Module({
  imports: [
    UsuarioModule,
    ProdutoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    PedidoModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FiltroExcecao,
    },
  ],
})
export class AppModule {}
