import { Injectable, } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) { }

    async criaUsuario(dadosDoUsuario: CriaUsuarioDTO) {
        const usuarioEntity = new UsuarioEntity()

        Object.assign(usuarioEntity, dadosDoUsuario);

        return await this.usuarioRepository.save(usuarioEntity);
    }

    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.find();
        const usuariosLista = usuariosSalvos.map(
            (usuario) => new ListaUsuarioDTO(
                usuario.id,
                usuario.nome,
                usuario.email
            )

        );

        return usuariosLista;
    }

    async atualizaUsuario(id: string, usuarioDTO: AtualizaUsuarioDTO) {
        await this.usuarioRepository.update(id, usuarioDTO);
    }

    async delataUsuario(id: string) {
        await this.usuarioRepository.delete(id);
    }
}