import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ImagenProducto } from './imagenProducto.entity';
import { Usuario } from 'src/auth/entities/usuario.entity';

@Entity({ name: 'productos' })
export class Producto {
  @ApiProperty({
    example: 'b2ad0a70-21b4-42e1-9e25-86e01c6499da',
    description: 'ID de Producto',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Modelo de Producto',
    description: 'Modelo de Producto',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  modelo: string;

  @ApiProperty({
    example: 'modelo_de_producto',
    description: 'Slug',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  slug: string;

  @ApiProperty({
    example: ['https://imagen1.jpg', 'https://imagen2.jpg'],
    description: 'Imagenes de Producto',
  })
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
