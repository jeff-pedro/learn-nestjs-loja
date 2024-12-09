import { Catch, ArgumentsHost, HttpException, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class FiltroDeExcecaoHttp implements ExceptionFilter {
  catch(excecao: unknown, host: ArgumentsHost) {
    console.log(excecao);

    const contexto = host.switchToHttp();
    const resposta = contexto.getResponse<Response>();
    const request = contexto.getRequest<Request>();

    const { status, body } = 
        excecao instanceof HttpException ?
        {
            status: excecao.getStatus(),
            body: excecao.getResponse()
        } : {
            status:HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                timestamp: new Date().toISOString(),
                path: request.url
            }
        }

    resposta.status(status).json(body);
  }
}
