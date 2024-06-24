import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];

  async salvarUsuario(usuario: UsuarioEntity) {
    this.usuarios.push(usuario);
  }

  async listarUsuarios() {
    return this.usuarios;
  }

  private buscarUsuarioId(id: string) {
    const usuario = this.usuarios.find((usuario) => usuario.id === id);

    if (!usuario) {
      throw new Error('Usuario não existe');
    }

    return usuario;
  }

  async existeEmail(email: string) {
    const usuario = this.usuarios.find((usuario) => usuario.email === email);
    return usuario !== undefined;
  }

  async atualizarUsuario(id: string, dadosUsuario: Partial<UsuarioEntity>) {
    const usuario = this.buscarUsuarioId(id);

    Object.entries(dadosUsuario).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }
      usuario[chave] = valor;
    });

    return usuario;
  }

  async deletarUsuario(id: string) {
    const usuario = this.buscarUsuarioId(id);
    this.usuarios = this.usuarios.filter(
      (usuarioSalvo) => usuarioSalvo.id !== id,
    );
    return usuario;
  }
}
