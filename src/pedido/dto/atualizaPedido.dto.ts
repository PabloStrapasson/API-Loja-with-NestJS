import { IsEnum } from 'class-validator';
import { StatusPedido } from '../enum/StatusPedido.enum';

export class AtualizaPedidoDTO {
  @IsEnum(StatusPedido)
  status: StatusPedido;
}
