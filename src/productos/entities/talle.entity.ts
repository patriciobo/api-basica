import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'talles' })
export class Talle {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text')
  nombre: string;

  @Column('text')
  unidad?: string;
}
