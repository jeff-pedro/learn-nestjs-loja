import { Injectable } from "@nestjs/common";

@Injectable()
export class ProdutoRepository {
    private produtos = [];
    private id: number = 0;

    async salvar(produto) {
        this.produtos.push({ id: this.geraId(), ...produto })
    }

    async listar() {
        return this.produtos;
    }

    private geraId(): number {
        return (this.id = this.id + 1);
    }
}