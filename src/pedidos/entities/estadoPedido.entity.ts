import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'estados_pedido' })
export class EstadoPedido {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  nombre: string;

  @Column('text')
  color: string;
}
