import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository {
    private usuarios: UsuarioEntity[] = [];

    async salvar(usuario: UsuarioEntity) {
        this.usuarios.push(usuario);
    }

    async listar() {
        return this.usuarios;
    }

    async atualizar(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
        const possivelUsuario = this.usuarios.find(
            (usuarioSalvo) => usuarioSalvo.id === id
        )

        if (!possivelUsuario) {
            throw new Error('Usuário não existe');
        }

        /* Uma possivel implementação válida: */

        /* Usando o utilitário Omit do TypeScript, não é necessário validar
            se o id foi passado erronemante no corpo da requisição. */

        // if (!dadosDeAtualizacao.id) {
        //     Object.assign(possivelUsuario, dadosDeAtualizacao)
        // }

        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            if (chave === 'id') {
                return;
            }

            possivelUsuario[chave] = valor
        })

        return possivelUsuario;
    }

    async existeComEmail(email: string) {
        const possivelUsuario = this.usuarios.find(
            (usuario) => usuario.email === email
        );

        return possivelUsuario !== undefined;
    }
}