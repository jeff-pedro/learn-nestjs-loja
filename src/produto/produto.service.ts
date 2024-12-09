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

        Object.assign(produtoEntity, dadosProduto);

        return this.produtoRepository.save(produtoEntity);
    }

    async listaProdutos() {
        const produto = await this.produtoRepository.find();

        if (produto.length === 0) {
            throw new NotFoundException("Nenhum produto cadastrado.")
        }

        return produto;
    }

    async listaProdutoPorId(id: string) {
        const produto = await this.produtoRepository.findOne({ where: { id } });

        if (!produto) {
            throw new NotFoundException("Produto não encontrado.");
        }

        return produto;
    }

    async atualizaProduto(id: string, novosDados: AtualizaProdutoDTO) {
        const produtoEntity = await this.produtoRepository.findOneBy({ id });

        if (produtoEntity === null) {
            throw new NotFoundException("O produto não foi encontrado.");
        }

        Object.assign(produtoEntity, novosDados);

        return this.produtoRepository.save(produtoEntity);
    }

    async deletaProduto(id: string) {
        return this.produtoRepository.delete(id);
    }
}