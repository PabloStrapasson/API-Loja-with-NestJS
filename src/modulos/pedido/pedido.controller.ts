import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  //Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDTO } from './dto/criaPedido.dto';
import { AtualizaPedidoDTO } from './dto/atualizaPedido.dto';
import {
  AutenticacaoGuard,
  RequisicaoComUsuario,
} from '../autenticacao/autenticacao/autenticacao.guard';

@UseGuards(AutenticacaoGuard)
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(
    @Req() req: RequisicaoComUsuario,
    @Body() dadosPedido: CriaPedidoDTO,
  ) {
    const usuarioId = req.usuario.sub;
    const pedidoCriado = await this.pedidoService.cadastraPedido(
      usuarioId,
      dadosPedido,
    );
    return pedidoCriado;
  }

  @Get()
  async obtemPedidosDeUsuario(@Req() req: RequisicaoComUsuario) {
    const usuarioId = req.usuario.sub;
    const pedidos = await this.pedidoService.obtemPedidosDeUsuario(usuarioId);

    return pedidos;
  }

  @Patch(':id')
  update(
    @Param('id') pedidoId: string,
    @Body() dadosAtualizados: AtualizaPedidoDTO,
    @Req() req: RequisicaoComUsuario,
  ) {
    const usuarioId = req.usuario.sub;
    return this.pedidoService.atualizaPedido(
      pedidoId,
      dadosAtualizados,
      usuarioId,
    );
  }

  /*

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidoService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidoService.remove(+id);
  }
    */
}
