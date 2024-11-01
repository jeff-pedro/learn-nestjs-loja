import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoEntity, UsuarioEntity])],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
