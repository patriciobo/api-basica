import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EstadoPedido } from './estadoPedido.entity';
import { Envio } from './envio.entity';
import { DetallePedido } from './detallePedido.entity';
import { CostosYGanancia } from './costosYGanancia.entity';

@Entity({ name: 'pedidos' })
export class Pedido {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('increment')
  nroPedido: number;

  @Column('date')
  fechaPedido: string;

  @Column('numeric')
  valorTotal: number;

  @Column('numeric')
  valorPagado: number;

  @Column('text')
  formaPago: string; //puede ser un tipo

  @Column('text')
  comprador: string;

  @Column('text')
  problemas?: string;

  @OneToOne(() => EstadoPedido)
  @JoinColumn()
  estado: EstadoPedido;

  @OneToOne(() => Envio)
  @JoinColumn()
  envio?: Envio;

  @OneToOne(() => CostosYGanancia)
  @JoinColumn()
  costosYGanancia?: CostosYGanancia;

  @OneToMany(() => DetallePedido, (detallePedido) => detallePedido.pedido)
  detallePedido: DetallePedido[];
}
