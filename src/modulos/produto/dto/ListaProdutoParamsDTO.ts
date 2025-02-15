import { IsUUID } from "class-validator";

export class ListaProdutoParamsDTO {
    @IsUUID()
    id: string;
}