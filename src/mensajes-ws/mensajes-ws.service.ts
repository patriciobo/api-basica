import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { Repository } from 'typeorm';

interface ClientesConectados {
  [id: string]: { socket: Socket; usuario: Usuario };
}

@Injectable()
export class MensajesWsService {
  private clientesConectados: ClientesConectados = {};

  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async registrarCliente(cliente: Socket, idUsuario: string) {
    const usuario = await this.usuariosRepository.findOneBy({ id: idUsuario });

    if (!usuario || !usuario.estaActivo)
      throw new UnauthorizedException('Usuario inexistente o inactivo');

    this.verificarConexionUsuario(usuario);

    this.clientesConectados[cliente.id] = { socket: cliente, usuario };
  }

  removerCliente(cliente: Socket) {
    delete this.clientesConectados[cliente.id];
  }

  obtenerClientesConectados(): string[] {
    return Object.keys(this.clientesConectados);
  }

  obtenerNombreUsuario(socketId: string) {
    return this.clientesConectados[socketId].usuario.nombreCompleto;
  }

  private verificarConexionUsuario(usuario: Usuario) {
    for (const id of Object.keys(this.clientesConectados)) {
      const clienteConectado = this.clientesConectados[id];

      if (clienteConectado.usuario.id === usuario.id) {
        clienteConectado.socket.disconnect();
        break;
      }
    }
  }
}
