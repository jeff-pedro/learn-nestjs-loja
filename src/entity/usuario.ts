import { Column, Entity, PrimaryColumn   } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryColumn()
    id: string;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    senha: string;
}
