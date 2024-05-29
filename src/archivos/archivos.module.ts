import { Module } from '@nestjs/common';
import { ArchivosService } from './archivos.service';
import { ArchivosController } from './archivos.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ArchivosController],
  providers: [ArchivosService],
  imports: [ConfigModule],
})
export class ArchivosModule {}
