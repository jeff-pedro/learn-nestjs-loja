import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";
import { ListaProdutoParamsDTO } from "./dto/ListaProdutoParamsDTO";
import { ProdutoService } from "./produto.service";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
import { CacheInterceptor } from "@nestjs/cache-manager";

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
    @UseInterceptors(CacheInterceptor)
    async listaProdutoPorId(@Param() params: ListaProdutoParamsDTO) {
        const produtoSalvo = await this.produtoService.listaProdutoPorId(params.id);

        console.log('Produto sendo buscaso do BD!');
        

        return produtoSalvo;
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