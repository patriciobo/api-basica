import { Producto } from 'src/productos/entities/producto.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('text')
  nombreCompleto: string;

  @Column('bool', {
    default: true,
  })
  estaActivo: boolean;

  @Column('text', {
    array: true,
    default: ['usuario'],
  })
  roles: string[];

  @OneToMany(
    () => Producto,
    (producto) => producto.usuario, //eager carga relaciones en la request
  )
  producto: Producto;

  @BeforeInsert()
  convertirCamposAlInsertar() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  convertirCamposAlActualizar() {
    this.convertirCamposAlInsertar();
  }
}
