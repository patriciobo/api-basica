import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @MinLength(2)
  modelo: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  imagenesProducto?: string[];
}
