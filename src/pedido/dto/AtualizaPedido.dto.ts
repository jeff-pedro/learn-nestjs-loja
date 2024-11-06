import { IsEnum } from 'class-validator';
import { StatusPedido } from '../enum/status-pedido.enum';

export class AtualizaPedidoDTO {
    @IsEnum(StatusPedido)
    status: StatusPedido;
}
