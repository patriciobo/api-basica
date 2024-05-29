import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateProductoDto {
  @ApiProperty({
    description: 'Modelo del Producto',
    minLength: 2,
    nullable: false,
  })
  @IsString()
  @MinLength(2)
  modelo: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  imagenesProducto?: string[];
}
