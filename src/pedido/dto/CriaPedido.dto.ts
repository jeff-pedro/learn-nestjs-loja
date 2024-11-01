import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CriaPedidoDTO {

    @IsString()
    @IsOptional()
    status: string;
    
    @IsNumber()
    @IsPositive()
    valorTotal: number;
}
