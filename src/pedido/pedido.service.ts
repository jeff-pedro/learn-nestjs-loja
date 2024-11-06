import { Injectable, NotFoundException } from '@nestjs/common';
import { PedidoEntity } from './pedido.entity';
import { StatusPedido } from './enum/status-pedido.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { In, Repository } from 'typeorm';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { ItemPedidoEntity } from './itempedido.entity';
import { ProdutoEntity } from 'src/produto/produto.entity';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,

    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,

  ) {};

  async buscaPedidos(itemPedido): Promise<ProdutoEntity> {
    return this.produtoRepository.findOneBy({ id: itemPedido.produtoId });
  }

  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {

    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    
    if (!usuario) {
      throw new NotFoundException(`Usuário com id ${usuarioId} não existe`);
    }

    const produtosIds = dadosDoPedido.itensPedido.map(itemPedido => itemPedido.produtoId);
    
    const produtosRelacionados = await this.produtoRepository.findBy({ id: In(produtosIds) })
    const pedidoEntity = new PedidoEntity();

    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario;
    
    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const itemPedidoEntity = new ItemPedidoEntity()
            
      const produtoRelacionado = produtosRelacionados.find((produto) => produto.id === itemPedido.produtoId);

      itemPedidoEntity.produto = produtoRelacionado;
      itemPedidoEntity.precoVenda = produtoRelacionado.valor;
      itemPedidoEntity.quantidade = itemPedido.quantidade
      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade

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

  async obtemPedidoDeUsuarioPorId(id: string) {
    return await this.pedidoRepository.findOneBy({ id });
  }

  async atualizaPedido(id: string, dto: AtualizaPedidoDTO) {
    const pedido = await this.pedidoRepository.findOneBy({ id });

    if (!pedido) {
      throw new Error('Pedido não encontrado!');
    }

    Object.assign(pedido, dto);

    return this.pedidoRepository.save(pedido);
  }
}
