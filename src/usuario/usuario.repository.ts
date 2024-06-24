import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioRepository {
  private usuarios = [];

  async salvarUsuario(usuario) {
    this.usuarios.push(usuario);
  }

  async listarUsuarios() {
    return this.usuarios;
  }
}
