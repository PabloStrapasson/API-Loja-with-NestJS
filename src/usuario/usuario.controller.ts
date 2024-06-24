import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}
  @Post()
  async criaUsuario(@Body() dadosUsuario) {
    this.usuarioRepository.salvarUsuario(dadosUsuario);
    return dadosUsuario;
  }
  @Get()
  async listaUsuarios() {
    return this.usuarioRepository.listarUsuarios();
  }
}
