import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from './dto/listaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDTO } from './dto/atualizaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async criaUsuario(usuario: UsuarioEntity) {
    await this.usuarioRepository.save(usuario);
  }

  async listaUsuarios() {
    const usuarios = await this.usuarioRepository.find();
    const listaUsuarios = usuarios.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );

    return listaUsuarios;
  }

  async atualizaUsuario(id: string, novoUsuario: AtualizaUsuarioDTO) {
    await this.usuarioRepository.update(id, novoUsuario);
  }

  async deletaUsuario(id: string) {
    await this.usuarioRepository.delete(id);
  }
}
