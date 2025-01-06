import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { Repository } from "typeorm";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>
    ) {};

    async criaProduto(dadosProduto: CriaProdutoDTO) {
        const produtoEntity = new ProdutoEntity();

        Object.assign(produtoEntity, dadosProduto as ProdutoEntity);
        // Object.assign(produtoEntity, <ProdutoEntity> dadosProduto);

        return this.produtoRepository.save(produtoEntity);
    }

    async listaProdutos() {
        const produto = await this.produtoRepository.find();

        if (produto.length === 0) {
            throw new NotFoundException("Nenhum produto cadastrado.")
        }

        return produto;
    }

    private async buscaProduto(id: string) {
        const produto = await this.produtoRepository.findOneBy({ id });

        if (produto === null) {
            throw new NotFoundException("Produto não encontrado.");
        }

        return produto;
    }

    async listaProdutoPorId(id: string) {
        return this.buscaProduto(id);
    }

    async atualizaProduto(id: string, novosDados: AtualizaProdutoDTO) {
        const produtoEntity = await this.buscaProduto(id);

        Object.assign(produtoEntity, novosDados as ProdutoEntity);

        return this.produtoRepository.save(produtoEntity);
    }

    async deletaProduto(id: string) {
        const resultado = await this.produtoRepository.delete(id);

        if(!resultado.affected) {
            throw new NotFoundException("Produto não encontrado.");
        }
    }
}