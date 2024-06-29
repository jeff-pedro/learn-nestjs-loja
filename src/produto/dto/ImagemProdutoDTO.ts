import { IsNotEmpty, IsUrl } from "class-validator";

export class ImagemProdutoDTO {
    @IsUrl(undefined, { message: 'A url é inválida' })
    url: string;
    @IsNotEmpty({ message: 'A descrição da imagem não pode ser vazia' })
    descricao: string;
}
