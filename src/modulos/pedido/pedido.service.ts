import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CriaPedidoDTO } from './dto/criaPedido.dto';
import { AtualizaPedidoDTO } from './dto/atualizaPedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { In, Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/StatusPedido.enum';
import { ItemPedidoEntity } from './itempedido.entity';
import { ProdutoEntity } from '../produto/produto.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  private async buscaUsuarioPorId(usuarioId: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    if (usuario === null) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return usuario;
  }

  private trataDadosPedido(
    dadosPedido: CriaPedidoDTO,
    produtosRelacionados: ProdutoEntity[],
  ) {
    dadosPedido.itensPedido.forEach((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );

      if (produtoRelacionado === undefined) {
        throw new NotFoundException(
          `Produto com id ${itemPedido.produtoId} não foi encontrado!`,
        );
      }

      if (itemPedido.quantidade > produtoRelacionado.quantidadeDisponivel) {
        throw new BadRequestException(
          `A quantidade solicitada (${itemPedido.quantidade}) do produto ${produtoRelacionado.nome} é maior que a disponível (${produtoRelacionado.quantidadeDisponivel})`,
        );
      }
    });
  }

  async cadastraPedido(usuarioId: string, dadosPedidos: CriaPedidoDTO) {
    const usuario = await this.buscaUsuarioPorId(usuarioId);
    const produtosIds = dadosPedidos.itensPedido.map(
      (itemPedido) => itemPedido.produtoId,
    );
    const produtosRelacionados = await this.produtoRepository.findBy({
      id: In(produtosIds),
    });
    const newPedido = new PedidoEntity();

    newPedido.status = StatusPedido.EM_PROCESAMENTO;
    newPedido.usuario = usuario;

    this.trataDadosPedido(dadosPedidos, produtosRelacionados);

    const itensPedidoEntities = dadosPedidos.itensPedido.map((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );

      const itemPedidoEntity = new ItemPedidoEntity();

      itemPedidoEntity.produto = produtoRelacionado!;
      itemPedidoEntity.precoVenda = produtoRelacionado!.valor;
      itemPedidoEntity.quantidade = itemPedido.quantidade;
      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade;

      return itemPedidoEntity;
    });

    const valorTotal = itensPedidoEntities.reduce((total, item) => {
      return total + item.precoVenda * item.quantidade;
    }, 0);

    newPedido.itensPedido = itensPedidoEntities;
    newPedido.valorTotal = valorTotal;

    const pedidoCriado = await this.pedidoRepository.save(newPedido);
    return pedidoCriado;
  }

  async obtemPedidosDeUsuario(usuarioId: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const usuario = await this.buscaUsuarioPorId(usuarioId);

    return await this.pedidoRepository.find({
      where: {
        usuario: { id: usuarioId },
      },
      relations: {
        usuario: true,
      },
    });
  }

  async atualizaPedido(id: string, dto: AtualizaPedidoDTO, usuarioId: string) {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: { usuario: true },
    });

    if (pedido === null) {
      throw new NotFoundException('Pedido não foi encontrado!');
    }

    if (pedido.usuario.id !== usuarioId) {
      throw new ForbiddenException(
        'Você não tem autorização para atualizar esse pedido',
      );
    }

    Object.assign(pedido, dto as PedidoEntity);

    return this.pedidoRepository.save(pedido);
  }
}
