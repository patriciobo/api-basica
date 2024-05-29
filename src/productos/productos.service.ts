import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ImagenProducto } from './entities/imagenProducto.entity';
import { Usuario } from 'src/auth/entities/usuario.entity';

@Injectable()
export class ProductosService {
  private readonly logger = new Logger('ProductosService');

  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    @InjectRepository(ImagenProducto)
    private readonly imagenProductoRepository: Repository<ImagenProducto>,

    private readonly dataSource: DataSource, //Conoce la config de la BD para ejecutar queries
  ) {}

  async create(createProductoDto: CreateProductoDto, usuario: Usuario) {
    try {
      const { imagenesProducto = [], ...detallesProducto } = createProductoDto;

      const producto = this.productoRepository.create({
        ...detallesProducto,
        usuario,
        imagenesProducto: imagenesProducto.map((imagen) =>
          this.imagenProductoRepository.create({ url: imagen }),
        ),
      });

      await this.productoRepository.save(producto);

      return { ...producto, imagenesProducto: imagenesProducto };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDTO: PaginationDto) {
    const { limit, offset } = paginationDTO;
    const productos = await this.productoRepository.find({
      take: limit,
      skip: offset,
      relations: {
        imagenesProducto: true,
      },
    });

    return productos;
  }

  async findOne(terminoBusqueda: string) {
    let producto;

    isUUID(terminoBusqueda)
      ? (producto = await this.productoRepository.findOneBy({
          id: terminoBusqueda,
        }))
      : (producto = await this.productoRepository.findOneBy({
          slug: terminoBusqueda,
        }));

    if (!producto)
      throw new NotFoundException(
        `No se encontró el producto que coincida con el termino de búsqueda: ${terminoBusqueda}`,
      );

    return producto;
  }

  async update(
    id: string,
    updateProductoDto: UpdateProductoDto,
    usuario: Usuario,
  ) {
    const { imagenesProducto, ...propsParaActualizar } = updateProductoDto;

    const producto = await this.productoRepository.preload({
      id,
      ...propsParaActualizar,
    });

    if (!producto)
      throw new NotFoundException(`No se encontró el producto ${id}`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (imagenesProducto) {
        await queryRunner.manager.delete(ImagenProducto, { producto: { id } }); //Muy importante el 2do parametro para no borrar toda la tabla

        producto.imagenesProducto = imagenesProducto.map((imagen) =>
          this.imagenProductoRepository.create({ url: imagen }),
        );
      }

      producto.usuario = usuario;
      await queryRunner.manager.save(producto);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return producto;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const producto = await this.findOne(id);

    await this.productoRepository.remove(producto);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException(`Error al crear producto: ${error}`);
  }

  //TODO No usar en Produccion, es solo para correr Seed
  async deleteAllProducts() {
    const query = this.productoRepository.createQueryBuilder();

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}
