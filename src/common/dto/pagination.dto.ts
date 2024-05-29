import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    default: 0,
    description: 'Cantidad de filas',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @Min(1)
  limit?: number;

  @ApiProperty({
    default: 0,
    description: 'Cantidad de filas a saltar',
  })
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  offset?: number;
}
