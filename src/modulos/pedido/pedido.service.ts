import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PedidoEntity } from './pedido.entity';
import { StatusPedido } from './enum/status-pedido.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../../modulos/usuario/usuario.entity';
import { In, Repository } from 'typeorm';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { ItemPedidoEntity } from './itempedido.entity';
import { ProdutoEntity } from '../../modulos/produto/produto.entity';
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

  ) { };

  async buscaPedidos(itemPedido): Promise<ProdutoEntity> {
    const pedido = await this.produtoRepository.findOneBy({ id: itemPedido.produtoId });

    if (!pedido) {
      throw new NotFoundException("Pedido não encontrado.")
    }

    return pedido;
  }

  private async buscaUsuario(id) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (usuario === null) {
      throw new NotFoundException("O usuário não foi encontrado.")
    }

    return usuario;
  }

  private trataDadosDoPedido(dadosDoPedido: CriaPedidoDTO, produtosRelacionados: ProdutoEntity[]) {
    dadosDoPedido.itensPedido.forEach((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId
      );

      if (produtoRelacionado === undefined) {
        throw new NotFoundException(`O produdo com id ${itemPedido.produtoId} não foi encontrado.`);
      }

      if (itemPedido.quantidade > produtoRelacionado.quantidadeDisponivel) {
        throw new BadRequestException(`A quantidade solicitada (${itemPedido.quantidade}) é maior do que a disponível (${produtoRelacionado.quantidadeDisponivel}) para o produto ${produtoRelacionado.nome}.`);
        }
      });
  };

  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
    const usuario = await this.buscaUsuario(usuarioId);

    const pedidoEntity = new PedidoEntity();
    
    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario;
    
    const produtosIds = dadosDoPedido.itensPedido.map(
      (itemPedido) => itemPedido.produtoId
    );

    const produtosRelacionados = await this.produtoRepository.findBy({ 
      id: In(produtosIds)
    });

    this.trataDadosDoPedido(dadosDoPedido, produtosRelacionados);
    
    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find((produto) => produto.id === itemPedido.produtoId);
      
      const itemPedidoEntity = new ItemPedidoEntity();
      
      itemPedidoEntity.produto = produtoRelacionado!;
      itemPedidoEntity.precoVenda = produtoRelacionado!.valor;
      
      itemPedidoEntity.quantidade = itemPedido.quantidade; 
      
      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade;

      this.produtoRepository.save(itemPedidoEntity.produto); // verificar o código do curso, pois não tinha essa linha
      
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
    await this.buscaUsuario(usuarioId);

    const pedido = await this.pedidoRepository.find({ 
      where: {
        usuario: { id: usuarioId }
      },
      relations: ['usuario'],
     });

     if (pedido.length === 0) {
      throw new NotFoundException(`Nenhum pedido para o usuário com id ${ usuarioId } foi encontrado.`);
     }
    
    return pedido;
  }

  async atualizaPedido(id: string, dto: AtualizaPedidoDTO) {
    const pedido = await this.pedidoRepository.findOneBy({ id });

    // throw new Error("Simulando erro de banco de dadoss")

    if (pedido === null) {
      throw new NotFoundException('O pedido não foi encontrado.');
    }

    Object.assign(pedido, dto as unknown as PedidoEntity);

    return this.pedidoRepository.save(pedido);
  }
}
