export class UsuarioRepository {
    private usuarios = [];
    private id = 0;

    async salvar(usuario) {
        this.usuarios.push({
            id: this.geraId(),
            ...usuario
        });

        console.log(this.usuarios);
    }

    private geraId() {
        return this.id = this.id + 1;
    }

}