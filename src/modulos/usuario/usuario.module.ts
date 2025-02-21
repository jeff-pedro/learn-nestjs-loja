import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { EmailEhUnicoValidator } from "./validacao/email-eh-unico.validator";
import { UsuarioService } from "./usuario.service";
import { UsuarioEntity } from "./usuario.entity";
import { ProdutoEntity } from "src/modulos/produto/produto.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity, ProdutoEntity])],
    controllers: [UsuarioController],
    providers: [UsuarioService, UsuarioRepository, EmailEhUnicoValidator],
    exports: [UsuarioService]
})

export class UsuarioModule { }
