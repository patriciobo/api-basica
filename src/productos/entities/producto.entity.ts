import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImagenProducto } from './imagenProducto.entity';

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

  @BeforeInsert()
  crearSlug() {
    this.slug = this.modelo.toLowerCase().replaceAll(' ', '_');
  }

  @BeforeUpdate()
  actualizarSlug() {
    this.slug = this.modelo.toLowerCase().replaceAll(' ', '_');
  }
}
