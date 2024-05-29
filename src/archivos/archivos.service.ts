import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ArchivosService {
  getStaticImagenProducto(nombreImagen: string) {
    const path = join(__dirname, '../../static/productos', nombreImagen);

    if (!existsSync(path))
      throw new BadRequestException(
        `No se encontro ningun producto con imagen ${nombreImagen}`,
      );

    return path;
  }
}
