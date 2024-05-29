import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesValidos } from 'src/auth/interfaces/roles-validos';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @Auth(RolesValidos.admin)
  create(
    @Body() createProductoDto: CreateProductoDto,
    @GetUser() usuario: Usuario,
  ) {
    return this.productosService.create(createProductoDto, usuario);
  }

  @Get()
  findAll(@Query() paginationDTO: PaginationDto) {
    return this.productosService.findAll(paginationDTO);
  }

  @Get(':terminoBusqueda')
  findOne(@Param('terminoBusqueda') terminoBusqueda: string) {
    return this.productosService.findOne(terminoBusqueda);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductoDto: UpdateProductoDto,
    @GetUser() usuario: Usuario,
  ) {
    return this.productosService.update(id, updateProductoDto, usuario);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosService.remove(id);
  }
}
