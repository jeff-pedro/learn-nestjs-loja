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

    private geraId() {
        return this.id = this.id + 1;
    }

}