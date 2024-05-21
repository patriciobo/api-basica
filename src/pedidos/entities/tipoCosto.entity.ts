import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tipos_costo' })
export class TipoCosto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  nombre: string;

  @Column('text')
  observacion: string;
}
