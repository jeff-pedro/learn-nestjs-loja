import { ArrayMinSize, IsArray, IsInt, IsOptional, IsPositive, IsString, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class ItemPedidoDTO {
    @IsUUID()
    produtoId: string;
    
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
