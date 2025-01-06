import { Injectable, NotFoundException, } from "@nestjs/common";
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

        Object.assign(usuarioEntity, dadosDoUsuario as UsuarioEntity);

        return await this.usuarioRepository.save(usuarioEntity);
    }

    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.find();

        if (usuariosSalvos.length === 0) {
            throw new NotFoundException("Nenhum usuário cadastrado.")
        }

        const usuariosLista = usuariosSalvos.map(
            (usuario) => new ListaUsuarioDTO(
                usuario.id,
                usuario.nome,
                usuario.email
            )

        );

        return usuariosLista;
    }

    async buscaPorEmail(email: string) {
        const checkEmail = await this.usuarioRepository.findOneBy({ email });

        if (checkEmail === null) {
            throw new NotFoundException("Usuário não encontrado.");
        }

        return checkEmail;
    }

    private async buscaUsuario(id: string) {
        const usuario = await this.usuarioRepository.findOneBy({ id });

        if (usuario === null) {
            throw new NotFoundException("Usuário não encontrado.");
        }
    
        return usuario;
    }

    async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO) {
        const usuarioEntity = await this.buscaUsuario(id);;

        Object.assign(usuarioEntity, novosDados as UsuarioEntity)

        await this.usuarioRepository.save(usuarioEntity);
    }

    async delataUsuario(id: string) {
        const resultado = await this.usuarioRepository.delete(id);

        if (!resultado.affected) {
            throw new NotFoundException("Usuário não encontrado.");
        }
    }
}