import { IsEmail, IsNotEmpty } from "class-validator";

export class AutenticacaDto {
    @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
    email: string;
    
    @IsNotEmpty({ message: 'O senha não pode ser vazia' })
    senha: string;
}