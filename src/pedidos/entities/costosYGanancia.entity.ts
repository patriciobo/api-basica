import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Costo } from './costo.entity';

@Entity()
export class CostosYGanancia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric')
  ganancia: number;

  @OneToMany(() => Costo, (costo) => costo.costosYGanancia)
  costo: Costo[];
}
