import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/criaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from './dto/listaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/atualizaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.id = uuid();
    usuarioEntity.nome = dadosUsuario.nome;
    usuarioEntity.email = dadosUsuario.email;
    usuarioEntity.senha = dadosUsuario.senha;

    this.usuarioRepository.salvarUsuario(usuarioEntity);
    return {
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      message: 'usuario criado com sucesso',
    };
  }

  @Get()
  async listaUsuarios() {
    const listaUsuariosCadastrados =
      await this.usuarioRepository.listarUsuarios();
    const usuarios = listaUsuariosCadastrados.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );

    return usuarios;
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() dadosUsuario: AtualizaUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usuarioRepository.atualizarUsuario(
      id,
      dadosUsuario,
    );

    return {
      usuario: usuarioAtualizado,
      message: 'Usuário atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async deletaUsuario(@Param('id') id: string) {
    const usuarioDeletado = await this.usuarioRepository.deletarUsuario(id);

    return {
      usuario: new ListaUsuarioDTO(usuarioDeletado.id, usuarioDeletado.nome),
      message: 'Usuário deletado com sucesso',
    };
  }
}
