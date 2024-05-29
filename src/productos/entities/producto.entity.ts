import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImagenProducto } from './imagenProducto.entity';
import { Usuario } from 'src/auth/entities/usuario.entity';

@Entity({ name: 'productos' })
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  modelo: string;

  @Column('text', {
    unique: true,
  })
  slug: string;

  @OneToMany(
    () => ImagenProducto,
    (imagenProducto) => imagenProducto.producto,
    { cascade: true, eager: true }, //eager carga relaciones en la request
  )
  imagenesProducto: ImagenProducto[];

  @ManyToOne(() => Usuario, (usuario) => usuario.producto, { eager: true })
  usuario: Usuario;

  @BeforeInsert()
  crearSlug() {
    this.slug = this.modelo.toLowerCase().replaceAll(' ', '_');
  }

  @BeforeUpdate()
  actualizarSlug() {
    this.slug = this.modelo.toLowerCase().replaceAll(' ', '_');
  }
}
