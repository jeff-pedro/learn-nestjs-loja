import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards, Request } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido.dto';
import { AutenticacaoGuard } from '../autenticacao/autenticacao.guard';

@UseGuards(AutenticacaoGuard)
@Controller('/pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async create(
    @Query('usuarioId') usuarioId: string,
    @Body() dadosDoPedido: CriaPedidoDTO,
    @Request() req: any
  ) {
    console.log(req.usuario);
    
    const pedidoCriado = await this.pedidoService.cadastraPedido(
      usuarioId, 
      dadosDoPedido
    );
    return pedidoCriado;
  }

  @Get()
  async obtemPedidosDeUsuario(@Query('usuarioId') usuarioId: string) {
    return this.pedidoService.obtemPedidosDeUsuario(usuarioId);
  }

  @Patch(':id')
  async atualizaPedido(
    @Param('id') pedidoId: string, 
    @Body() dadosDeAtualizacao: AtualizaPedidoDTO
  ) {
    return this.pedidoService.atualizaPedido(pedidoId, dadosDeAtualizacao);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pedidoService.remove(+id);
  // }
}
