export class ProdutoEntity {
    id: string;
    usuarioId: string;
    nome: string;
    valor: number;
    quantidadeDisponivel: number;
    descricao: string;
    caracteristicas: Object;
    imagens: Object;
    categoria: string;
    dataCriacao: Date;
    dataAtualizacao: Date;
}