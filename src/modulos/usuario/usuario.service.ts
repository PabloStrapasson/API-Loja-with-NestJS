import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from './dto/listaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDTO } from './dto/atualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/criaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async criaUsuario(usuarioDTO: CriaUsuarioDTO) {
    const usuario = new UsuarioEntity();

    Object.assign(usuario, usuarioDTO as UsuarioEntity);

    return await this.usuarioRepository.save(usuario);
  }

  async listaUsuarios() {
    const usuarios = await this.usuarioRepository.find();
    const listaUsuarios = usuarios.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );

    return listaUsuarios;
  }

  async atualizaUsuario(id: string, novoUsuario: AtualizaUsuarioDTO) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (usuario === null) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    Object.assign(usuario, novoUsuario as UsuarioEntity);

    return this.usuarioRepository.save(usuario);
  }

  async deletaUsuario(id: string) {
    const resultado = await this.usuarioRepository.delete(id);

    if (!resultado.affected)
      throw new NotFoundException('Usuário não encontrado!');
  }

  async existeEmail(email: string) {
    const usuario = await this.usuarioRepository.find({
      where: { email: email },
    });

    if (usuario === null) {
      throw new NotFoundException('Email não encontrado!');
    }

    return usuario;
  }
}
