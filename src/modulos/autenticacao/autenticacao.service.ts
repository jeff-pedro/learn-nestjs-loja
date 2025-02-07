import { Injectable, NotFoundException } from '@nestjs/common';
import { AutenticacaDto } from './dto/autenticaca.dto';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AutenticacaoService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>
  ) {}

  async login(dadosLogin: AutenticacaDto) {
    try {
      const { email, senha } = dadosLogin;
      const usuario = await this.buscaUsuario(email);
      const senhaHasheada = usuario.senha;

      await this.verificaUsuario(senha, senhaHasheada);
      
      const token = await this.geraJWT(usuario);

      return token;
    } catch (error) {
      return error
    }
    
  }

  private async buscaUsuario(email: string): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOneBy({ email })

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.')
    }

    return usuario;
  }

  private async verificaUsuario(senha: string, senhaHasheada: string): Promise<void> {
    const combina = await bcrypt.compare(senha, senhaHasheada)

      if (!combina) {
        throw new Error('O email ou a senha está incorreto.')
      }

      return;
  }

  private async geraJWT(usuario: UsuarioEntity): Promise<string> {
    const token = jwt.sign({ sub: usuario.id, nome: usuario.nome }, 'privateKey');
    return token;
  }
}
