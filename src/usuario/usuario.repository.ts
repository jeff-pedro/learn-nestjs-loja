import { Injectable } from "@nestjs/common";

@Injectable()
export class UsuarioRepository {
    private usuarios = [];
    private id = 0;

    async salvar(usuario) {
        this.usuarios.push({
            id: this.geraId(),
            ...usuario
        });
    }

    async listar() {
        return this.usuarios;
    }

    async existeComEmail(email: string) {
        const possivelUsuario = this.usuarios.find(
            (usuario) => usuario.email === email
        );

        return possivelUsuario !== undefined;
    }

    private geraId() {
        return this.id = this.id + 1;
    }
}