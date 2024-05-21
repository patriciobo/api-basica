import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pedido } from './pedido.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Entity({ name: 'detalles_pedido' })
export class DetallePedido {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  aclaracion: string;

  @OneToOne(() => Producto)
  @JoinColumn()
  producto: Producto;

  @ManyToOne(() => Pedido, (pedido) => pedido.detallePedido)
  pedido: Pedido;
}
