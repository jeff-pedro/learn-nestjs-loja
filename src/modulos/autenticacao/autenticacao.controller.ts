import { Controller, Post, Body } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaDto } from './dto/autenticaca.dto';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post('login')
  async login(@Body() { email, senha }: AutenticacaDto) {
    return await this.autenticacaoService.login(email, senha);
  }
}
