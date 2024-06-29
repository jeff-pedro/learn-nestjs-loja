import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsUrl, MaxLength, Min, ValidateNested } from "class-validator";

export class AtualizaProdutoDTO {
    @IsNotEmpty({ message: 'O nome do produto não pode ser vazio' })
    @IsOptional()
    nome: string;

    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O valor não é um número é inválido' })
    @IsPositive({ message: 'O valor do produto precisa ser um número positivo' })
    @IsOptional()
    valor: number;

    @Min(0, { message: 'A quantidade precisa ser um número igual ou maior que zero' })
    @IsOptional()
    quantidadeDisponivel: number;

    @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
    @MaxLength(1000, { message: 'A descrição não pode ser maior que 1000 caracteres' })
    @IsOptional()
    descricao: string;

    @IsArray()
    @ArrayMinSize(3, { message: 'A lista de características do produto precisa ter pelo menos 3 itens' })
    @IsOptional()
    @ValidateNested()
    @Type(() => AtualizaCaracteristicaProdutoDTO)
    caracteristicas: AtualizaCaracteristicaProdutoDTO[];

    @IsArray()
    @ArrayMinSize(1, { message: 'A lista de imagens do produto precisa ter pelo menos 1 item' })
    @IsOptional()
    @ValidateNested()
    @Type(() => AtualizaImagemProdutoDTO)
    imagens: AtualizaImagemProdutoDTO[];

    @IsNotEmpty({ message: 'A categoria do produto não pode ser vazia' })
    @IsOptional()
    categoria: string;

    @IsDateString()
    @IsOptional()
    dataCriacao: Date;

    @IsDateString()
    @IsOptional()
    dataAtualizacao: Date;
}

class AtualizaCaracteristicaProdutoDTO {
    @IsNotEmpty({ message: 'O nome da caracteristica não pode ser vazio' })
    nome: string;
    @IsNotEmpty({ message: 'A descrição da caracteristica não pode ser vazia' })
    descricao: string;
}

class AtualizaImagemProdutoDTO {
    @IsUrl(undefined, { message: 'A url é inválida' })
    url: string;
    @IsNotEmpty({ message: 'A descrição da imagem não pode ser vazia' })
    descricao: string;
}
