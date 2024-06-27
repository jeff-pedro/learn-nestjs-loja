import { IsNumberString } from "class-validator";

export class ListaProdutoParamsDTO {
    @IsNumberString()
    id: number;
}