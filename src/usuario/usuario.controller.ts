import { Body, Controller, Get, Post } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';

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
            id: usuarioEntity.id,
            message: 'usuário criado com sucesso'
        };
    }

    @Get()
    async listaUsuarios() {
        return await this.usuarioRepository.listar();
    }
}
