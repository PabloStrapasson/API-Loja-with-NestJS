import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UsuarioPayload } from '../autenticacao.service';
import { JwtService } from '@nestjs/jwt';

export interface RequisicaoComUsuario extends Request {
  usuario: UsuarioPayload;
}

@Injectable()
export class AutenticacaoGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requisicao = context
      .switchToHttp()
      .getRequest<RequisicaoComUsuario>();
    const token = this.extrairTokenCabecalho(requisicao);

    if (!token) {
      throw new UnauthorizedException('Erro de autenticação');
    }

    try {
      const payload: UsuarioPayload = await this.jwtService.verifyAsync(token);
      requisicao.usuario = payload;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Token JWT inválido');
    }

    return true;
  }

  private extrairTokenCabecalho(requisicao: Request): string | undefined {
    //formato do header authorization: "Bearer <access_token>" -> Protocolo Http
    const [tipo, accessToken] =
      requisicao.headers.authorization?.split(' ') ?? [];

    return tipo === 'Bearer' ? accessToken : undefined;
  }
}
