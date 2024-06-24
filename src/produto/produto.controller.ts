import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";

@Controller('/produtos')
export class ProdutoController {
    constructor(private produtoRepository: ProdutoRepository) { }

    @Post()
    async criaProduto(@Body() dadosDoProtudo) {
        await this.produtoRepository.salvar(dadosDoProtudo);
        return dadosDoProtudo;
    }

    @Get()
    async listaProdutos() {
        return await this.produtoRepository.listar();
    }
}