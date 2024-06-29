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

    private buscaPorId(id: string) {
        const possivelUsuario = this.usuarios.find(
            (usuarioSalvo) => usuarioSalvo.id === id
        )

        if (!possivelUsuario) {
            throw new Error('Usuário não existe');
        }

        return possivelUsuario;
    }

    async atualizar(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
        const usuario = this.buscaPorId(id);

        /* Uma possivel implementação válida: */
        // if (!dadosDeAtualizacao.id) {
        //     Object.assign(possivelUsuario, dadosDeAtualizacao)
        // }

        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            if (chave === 'id') {
                return;
            }

            usuario[chave] = valor
        })

        return usuario;
    }

    async remover(id: string) {
        const usuario = this.buscaPorId(id);

        this.usuarios = this.usuarios.filter(
            (usuarioSalvo) => usuarioSalvo.id !== id
        )

        return usuario;
    }

    async existeComEmail(email: string) {
        const possivelUsuario = this.usuarios.find(
            (usuario) => usuario.email === email
        );

        return possivelUsuario !== undefined;
    }
}