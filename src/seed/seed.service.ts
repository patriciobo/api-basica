import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from 'src/auth/entities/usuario.entity';
import { ProductosService } from 'src/productos/productos.service';
import { initialData } from './data/seed.data';

@Injectable()
export class SeedService {
  constructor(
    private readonly productosService: ProductosService,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async cargarDatos() {
    await this.borrarTablas();

    const usuario = await this.insertarUsuarios();

    await this.insertarProductos(usuario);

    return 'Seed ejecutado correctamente';
  }

  private async insertarProductos(usuario: Usuario) {
    const productos = initialData.productos;

    const insertPromises = [];

    productos.forEach((producto) => {
      insertPromises.push(this.productosService.create(producto, usuario));
    });

    await Promise.all(insertPromises);

    return true;
  }

  private async insertarUsuarios() {
    const usuariosSeed = initialData.usuarios;

    const usuarios: Usuario[] = [];

    usuariosSeed.forEach((usuario) => {
      usuarios.push(this.usuarioRepository.create(usuario));
    });

    const usuariosCreados = await this.usuarioRepository.save(usuarios);

    return usuariosCreados[0]; //devolvemos 1 usuario para pasar a la siguiente funcion
  }

  private async borrarTablas() {
    await this.productosService.deleteAllProducts();

    const queryBuilder = this.usuarioRepository.createQueryBuilder();

    await queryBuilder.delete().where({}).execute();
  }
}
