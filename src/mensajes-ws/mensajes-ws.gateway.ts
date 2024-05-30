import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MensajesWsService } from './mensajes-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dto/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@WebSocketGateway({ cors: true })
export class MensajesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wsServer: Server;

  constructor(
    private readonly mensajesWsService: MensajesWsService,
    //Se inyecta el JwtService para verificar el payload
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(cliente: Socket) {
    //El header 'authentication' es custom, se declara en el front cuando se manda el token
    const token = cliente.handshake.headers.authentication as string;
    let payload: JwtPayload;

    try {
      //Verify nos da el id del usuario, iat y exp del token
      payload = this.jwtService.verify(token);
      await this.mensajesWsService.registrarCliente(cliente, payload.id);
    } catch (error) {
      cliente.disconnect();
      return;
    }

    console.log({ payload });

    this.wsServer.emit(
      'usuariosActualizados',
      this.mensajesWsService.obtenerClientesConectados(),
    );
  }

  handleDisconnect(cliente: Socket) {
    this.mensajesWsService.removerCliente(cliente);

    this.wsServer.emit(
      'usuariosActualizados',
      this.mensajesWsService.obtenerClientesConectados(),
    );
  }

  @SubscribeMessage('message-from-client')
  //el Decorador da acceso a los parametros client y payload
  onMessageFromClient(cliente: Socket, payload: NewMessageDto) {
    //! Emite solo al cliente
    //client.emit()

    //! Emitir a todos menos al cliente inicial
    /* cliente.broadcast.emit('message-from-server', {
      fullName: 'P',
      message: payload.message,
    }); */

    this.wsServer.emit('message-from-server', {
      fullName: this.mensajesWsService.obtenerNombreUsuario(cliente.id),
      message: payload.message,
    });
  }
}
