import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StatusPedido } from "./enum/status-pedido.enum";

@Entity('pedidos')
export class Pedido {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ name: 'valor_total', nullable: false })
    valorTotal: number;

    @Column({ name: 'status', enum: StatusPedido, nullable: false, default: 'inativo' })
    status: StatusPedido;

    // @Column({ name: 'itens_pedido', nullable: false })
    // itensPedido: ItemPedido[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;
  
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
  
}
