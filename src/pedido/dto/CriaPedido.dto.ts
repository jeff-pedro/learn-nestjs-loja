import { ArrayMinSize, IsArray, IsDecimal, IsInt, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class ItemPedidoDTO {
    @IsPositive()
    @IsInt()
    quantidade: number;

    // @IsPositive()
    // @IsDecimal()
    // precoVenda: number;
}

export class CriaPedidoDTO {
    @IsString()
    @IsOptional()
    status: string;

    @ValidateNested()
    @ArrayMinSize(1)
    @IsArray()
    @Type(() => ItemPedidoDTO)
    itensPedido: ItemPedidoDTO[];
}
