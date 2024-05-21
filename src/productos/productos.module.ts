import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { ImagenProducto } from './entities/imagenProducto.entity';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  imports: [TypeOrmModule.forFeature([Producto, ImagenProducto])],
  exports: [ProductosService],
})
export class ProductosModule {}
