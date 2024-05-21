import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'envios' })
export class Envio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  nombreApellido: string;

  @Column('date')
  fechaEnvio: string;

  @Column('numeric')
  costo: number;

  @Column('text')
  direccion: string;

  @Column('text')
  codigoPostal: string;

  @Column('text')
  telefono: string;

  @Column('text')
  email: string;
}
