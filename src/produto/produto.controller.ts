import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { ProdutoRepository } from "./produto.repository";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";
import { ListaProdutoParamsDTO } from "./dto/ListaProdutoParamsDTO";
import { ProdutoEntity } from "./produto.entity";
import { ListaProdutoDTO } from "./dto/ListaProduto.dto";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";

@Controller('/produtos')
export class ProdutoController {
    constructor(private produtoRepository: ProdutoRepository) { }

    @Post()
    async criaProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
        const produtoEntity = new ProdutoEntity();

        produtoEntity.id = uuid();
        Object.assign(produtoEntity, dadosDoProduto);

        await this.produtoRepository.salvar(produtoEntity);

        return {
            produto: new ListaProdutoDTO(
                produtoEntity.id,
                produtoEntity.nome
            ),
            mensagem: 'produto criado com sucesso'
        };
    }

    @Get()
    async listaProdutos() {
        return await this.produtoRepository.listar();
    }

    @Get('/:id')
    async listaProdutoPorId(@Param() params: ListaProdutoParamsDTO) {
        return await this.produtoRepository.listarPorId(params.id);
    }

    @Put('/:id')
    async atualizaProduto(@Param('id') id: string, @Body() novosDados: AtualizaProdutoDTO) {
        const produtoAtualizado = await this.produtoRepository.atualizar(id, novosDados);
        return {
            produto: new ListaProdutoDTO(
                produtoAtualizado.id,
                produtoAtualizado.nome
            ),
            mensagem: 'produto atualizado com sucesso'
        }
    }

    @Delete('/:id')
    async removeProduto(@Param('id') id: string) {
        const produtoRemovido = await this.produtoRepository.remover(id);
        return {
            produto: new ListaProdutoDTO(
                produtoRemovido.id,
                produtoRemovido.nome
            ),
            mensagem: 'produto removido com sucesso'
        }
    }
}