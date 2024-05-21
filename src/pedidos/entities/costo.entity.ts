import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CostosYGanancia } from './costosYGanancia.entity';
import { TipoCosto } from './tipoCosto.entity';
import { Persona } from './persona.entity';

@Entity({ name: 'costos' })
export class Costo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric')
  valor: number;

  @OneToOne(() => TipoCosto)
  @JoinColumn()
  tipoCosto: TipoCosto;

  @OneToOne(() => Persona)
  @JoinColumn()
  pagador: Persona;

  @ManyToOne(() => CostosYGanancia, (costosYGanancia) => costosYGanancia.costo)
  costosYGanancia: CostosYGanancia;
}
