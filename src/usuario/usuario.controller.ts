import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';

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
            usuario: new ListaUsuarioDTO(
                usuarioEntity.id,
                usuarioEntity.nome,
                usuarioEntity.email),
            mensagem: 'usuário criado com sucesso'
        };
    }

    @Get()
    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.listar();
        const listaDeUsuarios = usuariosSalvos.map(
            (usuario) => new ListaUsuarioDTO(
                usuario.id,
                usuario.nome,
                usuario.email
            )
        );
        return listaDeUsuarios;
    }

    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
        console.log(novosDados);

        const usuarioAtualizado = await this.usuarioRepository.atualizar(id, novosDados);
        return {
            usuario: new ListaUsuarioDTO(
                usuarioAtualizado.id,
                usuarioAtualizado.nome,
                usuarioAtualizado.email
            ),
            mensagem: 'usuario atualizado com sucesso'
        }
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string) {
        const usuarioRemovido = await this.usuarioRepository.remover(id);
        return {
            usuario: usuarioRemovido,
            mensagem: 'Usuário removido com sucesso'
        }
    }
}
