import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { Pedido } from './entities/pedido.entity';
import { Costo } from './entities/costo.entity';
import { CostosYGanancia } from './entities/costosYGanancia.entity';
import { DetallePedido } from './entities/detallePedido.entity';
import { Envio } from './entities/envio.entity';
import { EstadoPedido } from './entities/estadoPedido.entity';
import { TipoCosto } from './entities/tipoCosto.entity';

@Module({
  controllers: [PedidosController],
  providers: [PedidosService],
  imports: [
    TypeOrmModule.forFeature([
      Pedido,
      Costo,
      TipoCosto,
      CostosYGanancia,
      DetallePedido,
      Envio,
      EstadoPedido,
    ]),
  ],
})
export class PedidosModule {}
