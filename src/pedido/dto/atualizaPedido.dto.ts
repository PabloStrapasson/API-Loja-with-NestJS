import { PartialType } from '@nestjs/mapped-types';
import { CriaPedidoDTO } from './criaPedido.dto';

export class AtualizaPedidoDTO extends PartialType(CriaPedidoDTO) {}
