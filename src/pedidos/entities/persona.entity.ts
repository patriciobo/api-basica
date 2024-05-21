import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'personas' })
export class Persona {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  nombre: string;
}
