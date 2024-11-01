import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PedidoService } from './pedido.service';

@Controller('/pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async create(@Query('usuarioId') usuarioId: string) {
    const pedidoCriado = await this.pedidoService.cadastraPedido(usuarioId);
    return pedidoCriado;
  }

  @Get()
  async obtemPedidosDeUsuario(@Query('usuarioId') usuarioId: string) {
    return await this.pedidoService.obtemPedidosDeUsuario(usuarioId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidoService.listaPedidoPorId(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
  //   return this.pedidoService.update(+id, updatePedidoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pedidoService.remove(+id);
  // }
}
