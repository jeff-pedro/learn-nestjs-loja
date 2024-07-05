import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProdutoEntity } from './produto.entity';

@Entity({ name: 'produto_imagens' })
export class ProdutoImagem {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'url', length: 100, nullable: false })
    url: string;

    @Column({ name: 'descricao', length: 100, nullable: false })
    descricao: string;

    @ManyToOne(() => ProdutoEntity, (produto) => produto.imagens)
    produto: ProdutoEntity;
}
