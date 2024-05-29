//import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger'; //Es el mismo que de Nest excepto que hace la documentacion
import { CreateProductoDto } from './create-producto.dto';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {}
