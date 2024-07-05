import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { Repository } from "typeorm";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>
    ) { };

    async criaProduto(produtoEntity: ProdutoEntity) {
        this.produtoRepository.save(produtoEntity)
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