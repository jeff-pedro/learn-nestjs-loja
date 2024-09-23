import { Injectable } from "@nestjs/common";
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
    ) { };

    async criaProduto(dadosProduto: CriaProdutoDTO) {
        const produtoEntity = new ProdutoEntity();

        Object.assign(produtoEntity, dadosProduto);

        return this.produtoRepository.save(produtoEntity);
    }

    async listaProdutos() {
        return this.produtoRepository.find();
    }

    async listaProdutoPorId(id: string) {
        return this.produtoRepository.findOne({ where: { id } });
    }

    async atualizaProduto(id: string, produtoDTO: AtualizaProdutoDTO) {
        return this.produtoRepository.update(id, produtoDTO);
    }

    async deletaProduto(id: string) {
        return this.produtoRepository.delete(id);
    }
}