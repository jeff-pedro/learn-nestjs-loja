import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";
import { ListaProdutoParamsDTO } from "./dto/ListaProdutoParamsDTO";
import { ProdutoService } from "./produto.service";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
import { CACHE_MANAGER, CacheInterceptor } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { ProdutoEntity } from "./produto.entity";
import { CustomLoggerService } from "../custom-logger/custom-logger.service";

@Controller('/produtos')
export class ProdutoController {
    constructor(
        private produtoService: ProdutoService,
        private readonly logger: CustomLoggerService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {
        this.logger.setContext('ProdutoController')
    }

    @Post()
    async criaProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
        const produtoCadastrado = await this.produtoService.criaProduto(dadosDoProduto);
        
        this.logger.logColorido(produtoCadastrado);
        this.logger.logEmArquivo(produtoCadastrado);
        
        return {
            mensagem: 'Produto criado com sucesso.',
            produto: produtoCadastrado,
        };
    }

    @Get()
    @UseInterceptors(CacheInterceptor)
    async listaProdutos() {
        return await this.produtoService.listaProdutos();
    }

    @Get('/:id')
    @UseInterceptors(CacheInterceptor)
    async listaProdutoPorId(@Param() params: ListaProdutoParamsDTO) {
        let produto = await this.cacheManager.get<ProdutoEntity>(`produto-${params.id}`)
        console.log(produto);
        

        if(!produto) {
            console.log('Obtendo produto do cache!');
            produto = await this.produtoService.listaProdutoPorId(params.id);

            await this.cacheManager.set(`produto-${params.id}`, produto)
        }

        return {
            mensagem: 'produto encontrado com sucesso',
            produto
        };
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