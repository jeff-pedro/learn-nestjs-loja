import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';

@Controller('/usuarios')
export class UsuarioController {
    private usuarioRepository = new UsuarioRepository();

    @Post()
    async criaUsuario(@Body() dadosDoUsuario) {
        await this.usuarioRepository.salvar(dadosDoUsuario);
        return { message: 'usuario salvo com sucesso!' };
    }

    @Get()
    async listaUsuarios() {
        return await this.usuarioRepository.listar();
    }
}