import { Module } from '@nestjs/common';
import { MensajesWsService } from './mensajes-ws.service';
import { MensajesWsGateway } from './mensajes-ws.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [MensajesWsGateway, MensajesWsService],
  //Importamos AuthModule para tener acceso a JwtService
  imports: [AuthModule],
})
export class MensajesWsModule {}
