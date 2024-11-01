import { Injectable, NotFoundException } from '@nestjs/common';
import { PedidoEntity } from './pedido.entity';
import { StatusPedido } from './enum/status-pedido.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,

  ) {};

  async cadastraPedido(usuarioId: string) {

    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });

    if (!usuario) {
      throw new NotFoundException(`Usuário com id ${usuarioId} não existe`);
    }

    const pedido = new PedidoEntity();
    
    pedido.valorTotal = 0
    pedido.status = StatusPedido.EM_PROCESSAMENTO;
    pedido.usuario = usuario;
  
    try {
      const pedidoCriado = await this.pedidoRepository.save(pedido);
      return pedidoCriado;
    } catch (error) {
      throw new Error(error);
    }
  }

  async obtemPedidosDeUsuario(usuarioId: string) {
    return this.pedidoRepository.find({ 
      relations: ['usuario'],
      where: {
        usuario: { id: usuarioId }
      }
     });
  }

  async listaPedidoPorId(id: string) {
    return await this.pedidoRepository.findOneBy({ id });
  }
}
