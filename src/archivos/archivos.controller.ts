import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  BadRequestException,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { ArchivosService } from './archivos.service';
import { nombradorArchivos } from './helpers/nombradorArchivos.helper';
import { ConfigService } from '@nestjs/config';

@Controller('archivos')
export class ArchivosController {
  constructor(
    private readonly archivosService: ArchivosService,
    private readonly configService: ConfigService,
  ) {}

  @Get('producto/:nombreImagen')
  buscarImagenProducto(
    @Res() res: Response,
    @Param('nombreImagen') nombreImagen: string,
  ) {
    const path = this.archivosService.getStaticImagenProducto(nombreImagen);

    res.sendFile(path);
  }

  @Post('producto')
  //TODO: Validar archivos en interceptor pq se suben al file system antes de pasar por el parsefilepipe
  @UseInterceptors(
    FileInterceptor('archivo', {
      storage: diskStorage({
        destination: './static/productos',
        filename: nombradorArchivos,
      }),
    }),
  )
  subirArchivo(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1e6 }), // Max file size 1MB
          new FileTypeValidator({
            fileType: new RegExp('image/(jpeg|jpg|png)'),
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('El archivo no es una imagen');

    const urlSegura = `${this.configService.get('HOST_API')}/archivos/producto/${file.filename}`;

    return { urlSegura };
  }
}
