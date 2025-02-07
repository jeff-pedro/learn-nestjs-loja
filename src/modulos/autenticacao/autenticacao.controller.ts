import { Controller, Post, Body } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaDto } from './dto/autenticaca.dto';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post('login')
  async login(@Body() dadosLogin: AutenticacaDto) {
    const token = await this.autenticacaoService.login(dadosLogin)
    return { accessToken: token };
  }
}
