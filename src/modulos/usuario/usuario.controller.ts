import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { UsuarioService } from './usuario.service';
import { HashearSenhaPipe } from '../../recursos/pipes/hashear-senha.pipe'; // boa prática com has relativo

@Controller('/usuarios')
export class UsuarioController {
    constructor(
        private usuarioService: UsuarioService
    ) { };

    @Post()
    async criaUsuario(
        @Body() { senha, ...dadosDoUsuario }: CriaUsuarioDTO,
        @Body('senha', HashearSenhaPipe) senhaHasheada: string
    ) {
        const usuarioCriado = await this.usuarioService.criaUsuario({
            ...dadosDoUsuario,
            senha: senhaHasheada
        });

        return {
            usuario: new ListaUsuarioDTO(usuarioCriado.id,usuarioCriado.nome,usuarioCriado.email),
            mensagem: 'usuário criado com sucesso'
        };
    }

    @Get()
    async buscaUsuarioPorEmail(@Query('email') email: string) {
        const usuariosEncontrado = await this.usuarioService.buscaPorEmail(email);
        return usuariosEncontrado;
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
