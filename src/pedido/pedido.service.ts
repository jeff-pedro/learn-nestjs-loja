import { Injectable, NotFoundException } from '@nestjs/common';
import { PedidoEntity } from './pedido.entity';
import { StatusPedido } from './enum/status-pedido.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { Repository } from 'typeorm';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { ItemPedidoEntity } from './itempedido.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,

  ) {};

  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {

    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });

    if (!usuario) {
      throw new NotFoundException(`Usuário com id ${usuarioId} não existe`);
    }

    const pedidoEntity = new PedidoEntity();

    
    // pedido.valorTotal = 0
    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario;
    
    const itensPedidoEntidades = dadosDoPedido.itensPedido.map(itemPedido => {
      const itemPedidoEntity = new ItemPedidoEntity()
      
      itemPedidoEntity.precoVenda = 10;
      itemPedidoEntity.quantidade = itemPedido.quantidade
      
      return itemPedidoEntity;
    });

    const valorTotal = itensPedidoEntidades.reduce((total, item) => {
      return total + Number(item.precoVenda) * item.quantidade;
    }, 0);

    pedidoEntity.itensPedido = itensPedidoEntidades
    pedidoEntity.valorTotal = valorTotal;
    
    try {
      const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);
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
