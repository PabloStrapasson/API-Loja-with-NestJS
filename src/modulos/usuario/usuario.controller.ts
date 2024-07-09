import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CriaUsuarioDTO } from './dto/criaUsuario.dto';
import { ListaUsuarioDTO } from './dto/listaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/atualizaUsuario.dto';
import { UsuarioService } from './usuario.service';
import { HashSenhaPipe } from '../../recursos/pipes/hashSenha.pipe';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criarUsuario(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() { senha, ...dadosUsuario }: CriaUsuarioDTO,
    @Body('senha', HashSenhaPipe) hashSenha: string,
  ) {
    const usuarioCriado = await this.usuarioService.criaUsuario({
      ...dadosUsuario,
      senha: hashSenha,
    });

    return {
      usuario: new ListaUsuarioDTO(usuarioCriado.id, usuarioCriado.nome),
      messagem: 'usuário criado com sucesso',
    };
  }

  @Get()
  async listarUsuarios() {
    const usuarios = await this.usuarioService.listaUsuarios();

    return usuarios;
  }

  @Put('/:id')
  async atualizarUsuario(
    @Param('id') id: string,
    @Body() dadosUsuario: AtualizaUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usuarioService.atualizaUsuario(
      id,
      dadosUsuario,
    );

    return {
      usuario: usuarioAtualizado,
      message: 'Usuário atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async deletarUsuario(@Param('id') id: string) {
    const usuarioDeletado = await this.usuarioService.deletaUsuario(id);

    return {
      usuario: usuarioDeletado,
      message: 'Usuário deletado com sucesso',
    };
  }
}
