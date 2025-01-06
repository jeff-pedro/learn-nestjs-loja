import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
// import { UsuarioRepository } from "../usuario.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UsuarioService } from "../usuario.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
    // constructor(private respository: UsuarioRepository) { }
    constructor(private usuarioService: UsuarioService) { }

    async validate(value: any): Promise<boolean> {
        try {
            const usuarioComEmailExiste = await this.usuarioService.buscaPorEmail(value);
            
            // Se o email existe, retorna false
            return !usuarioComEmailExiste;
        } catch (error) {
            if (error instanceof NotFoundException) {
                return true;
            }

            throw error;
        }
    }
}

export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: EmailEhUnicoValidator
        });
    };
};
