import { Controller, Get, Post, Body, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido.dto';
import { AutenticacaoGuard, RequisicaoComUsuario } from '../autenticacao/autenticacao.guard';

@UseGuards(AutenticacaoGuard)
@Controller('/pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async create(
    @Body() dadosDoPedido: CriaPedidoDTO,
    @Req() req: RequisicaoComUsuario
  ) {
    const usuarioId = req.usuario.sub;
    
    const pedidoCriado = await this.pedidoService.cadastraPedido(
      usuarioId, 
      dadosDoPedido
    );
    return pedidoCriado;
  }

  @Get()
  async obtemPedidosDeUsuario(@Req() req: RequisicaoComUsuario) {
    const usuarioId = req.usuario.sub;
    return this.pedidoService.obtemPedidosDeUsuario(usuarioId);
  }

  @Patch(':id')
  async atualizaPedido(
    @Param('id') pedidoId: string, 
    @Body() dadosDeAtualizacao: AtualizaPedidoDTO,
    @Req() req: RequisicaoComUsuario,
  ) {
    const usuarioId = req.usuario.sub;
    return this.pedidoService.atualizaPedido(
      pedidoId,
      dadosDeAtualizacao, 
      usuarioId
    );
  }
}
