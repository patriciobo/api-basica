import { Injectable } from '@nestjs/common';
import { ProductosService } from 'src/productos/productos.service';
import { initialData } from './data/seed.data';

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductosService) {}

  async cargarDatos() {
    try {
      const result = await this.insertarProductos();

      console.log('resultado:', result);
      return 'Seed ejecutado correctamente';
    } catch (error) {}
  }

  private async insertarProductos() {
    await this.productsService.deleteAllProducts();

    const productos = initialData.productos;

    const insertPromises = [];

    productos.forEach((producto) => {
      insertPromises.push(this.productsService.create(producto));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
