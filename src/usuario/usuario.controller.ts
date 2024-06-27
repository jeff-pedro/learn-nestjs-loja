import { Body, Controller, Get, Post } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
    constructor(private usuarioRepository: UsuarioRepository) { };

    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
        const usuarioEntity = new UsuarioEntity()

        usuarioEntity.id = uuid();
        Object.assign(usuarioEntity, dadosDoUsuario);

        await this.usuarioRepository.salvar(usuarioEntity);

        return {
            usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
            message: 'usuário criado com sucesso'
        };
    }

    @Get()
    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.listar();
        const listaDeUsuarios = usuariosSalvos.map(
            (usuario) => new ListaUsuarioDTO(
                usuario.id,
                usuario.nome
            )
        );
        return listaDeUsuarios;
    }
}
