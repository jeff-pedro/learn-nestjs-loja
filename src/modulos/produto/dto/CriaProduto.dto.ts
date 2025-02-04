import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsPositive, IsUrl, MaxLength, Min, ValidateNested } from "class-validator";
import { ProdutoEntity } from "../produto.entity";

export class CaracteristicaProdutoDTO {
    id: string;
    @IsNotEmpty({ message: 'O nome da caracteristica não pode ser vazio' })
    nome: string;
    @IsNotEmpty({ message: 'A descrição da caracteristica não pode ser vazia' })
    descricao: string;
    produto: ProdutoEntity;
}

export class ImagemProdutoDTO {
    id: string;
    @IsUrl(undefined, { message: 'A url é inválida' })
    url: string;
    @IsNotEmpty({ message: 'A descrição da imagem não pode ser vazia' })
    descricao: string;
    produto: ProdutoEntity;
}

export class CriaProdutoDTO {
    @IsNotEmpty({ message: 'O nome do produto não pode ser vazio' })
    nome: string;

    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O valor não é um número é inválido' })
    @IsPositive({ message: 'O valor do produto precisa ser um número positivo' })
    valor: number;

    @Min(0, { message: 'A quantidade precisa ser um número igual ou maior que zero' })
    quantidadeDisponivel: number;

    @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
    @MaxLength(1000, { message: 'A descrição não pode ser maior que 1000 caracteres' })
    descricao: string;

    @IsArray()
    @ArrayMinSize(3, { message: 'A lista de características do produto precisa ter pelo menos 3 itens' })
    @ValidateNested()
    @Type(() => CaracteristicaProdutoDTO)
    caracteristicas: CaracteristicaProdutoDTO[];

    @IsArray()
    @ArrayMinSize(1, { message: 'A lista de imagens do produto precisa ter pelo menos 1 item' })
    @ValidateNested()
    @Type(() => ImagemProdutoDTO)
    imagens: ImagemProdutoDTO[];

    @IsNotEmpty({ message: 'A categoria do produto não pode ser vazia' })
    categoria: string;

    // @IsDateString()
    // dataCriacao: Date;

    // @IsDateString()
    // dataAtualizacao: Date;
}
