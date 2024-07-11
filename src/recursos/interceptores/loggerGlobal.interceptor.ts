import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';
import { RequisicaoComUsuario } from 'src/modulos/autenticacao/autenticacao/autenticacao.guard';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextoHttp = context.switchToHttp();
    const requisicao = contextoHttp.getRequest<
      Request | RequisicaoComUsuario
    >();
    const resposta = contextoHttp.getResponse<Response>();

    const { path, method } = requisicao;
    const { statusCode } = resposta;
    this.logger.log(`${method} ${path}`);

    const instantePreControlador = Date.now();

    return next.handle().pipe(
      tap(() => {
        if ('usuario' in requisicao) {
          this.logger.log(
            `Rota acessada pelo usuário ${requisicao.usuario.sub}`,
          );
        }
        const tempoExecucaoRota = Date.now() - instantePreControlador;
        this.logger.log(
          `Resposta: status ${statusCode} - ${tempoExecucaoRota}ms`,
        );
      }),
    );
  }
}
