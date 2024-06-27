import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";
import { ListaProdutoParamsDTO } from "./dto/ListaProdutoParamsDTO";

@Controller('/produtos')
export class ProdutoController {
    constructor(private produtoRepository: ProdutoRepository) { }

    @Post()
    async criaProduto(@Body() criaProdutoDTO: CriaProdutoDTO) {
        await this.produtoRepository.salvar(criaProdutoDTO);
        return criaProdutoDTO;
    }

    @Get()
    async listaProdutos() {
        return await this.produtoRepository.listar();
    }

    @Get(':id')
    async listaProdutoPorId(@Param() params: ListaProdutoParamsDTO) {
        return await this.produtoRepository.listarPorId(params.id);
    }
}