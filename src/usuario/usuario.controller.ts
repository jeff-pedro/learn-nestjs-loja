import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';

@Controller('/usuarios')
export class UsuarioController {
    constructor(
        private usuarioService: UsuarioService
    ) { };

    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
        const usuarioEntity = new UsuarioEntity()
        Object.assign(usuarioEntity, dadosDoUsuario);
        usuarioEntity.id = uuid();

        await this.usuarioService.criaUsuario(usuarioEntity);

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
        const usuariosSalvos = await this.usuarioService.listaUsuarios();
        return usuariosSalvos;
    }

    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
        const usuarioAtualizado = await this.usuarioService.atualizaUsuario(id, novosDados);
        return {
            usuario: usuarioAtualizado,
            mensagem: 'usuário atualizado com sucesso'
        }
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string) {
        const usuarioRemovido = await this.usuarioService.delataUsuario(id);
        return {
            usuario: usuarioRemovido,
            mensagem: 'usuário removido com sucesso'
        }
    }
}
