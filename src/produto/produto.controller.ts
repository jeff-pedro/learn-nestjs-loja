import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";
import { ListaProdutoParamsDTO } from "./dto/ListaProdutoParamsDTO";
import { ProdutoService } from "./produto.service";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";

@Controller('/produtos')
export class ProdutoController {
    constructor(private produtoService: ProdutoService) { }

    @Post()
    async criaProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
        const produtoCadastrado = await this.produtoService.criaProduto(dadosDoProduto);

        return {
            mensagem: 'Produto criado com sucesso.',
            produto: produtoCadastrado,
        };
    }

    @Get()
    async listaProdutos() {
        return await this.produtoService.listaProdutos();
    }

    @Get('/:id')
    async listaProdutoPorId(@Param() params: ListaProdutoParamsDTO) {
        return await this.produtoService.listaProdutoPorId(params.id);
    }

    @Put('/:id')
    async atualizaProduto(@Param('id') id: string, @Body() novosDados: AtualizaProdutoDTO) {
        await this.produtoService.atualizaProduto(id, novosDados);
        return {
            mensagem: 'produto atualizado com sucesso'
        }
    }

    @Delete('/:id')
    async removeProduto(@Param('id') id: string) {
        const produtoRemovido = await this.produtoService.deletaProduto(id);
        return {
            produto: produtoRemovido,
            mensagem: 'produto removido com sucesso'
        }
    }
}