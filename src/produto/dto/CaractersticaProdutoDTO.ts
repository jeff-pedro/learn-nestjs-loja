import { IsNotEmpty } from "class-validator";

export class CaracteristicaProdutoDTO {
    @IsNotEmpty({ message: 'O nome da caracteristica não pode ser vazio' })
    nome: string;
    @IsNotEmpty({ message: 'A descrição da caracteristica não pode ser vazia' })
    descricao: string;
}
