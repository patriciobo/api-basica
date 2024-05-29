import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_METADATA } from 'src/auth/decorators/roles-autorizados.decorator';
import { Usuario } from 'src/auth/entities/usuario.entity';

@Injectable()
export class RolUsuarioGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //Devuelve true o false, dependiendo si lo deja pasar o no.

    //Se necesita el Reflector para obtener la metadata insertada con @SetMetadata
    const rolesValidos: string[] = this.reflector.get(
      ROLES_METADATA,
      context.getHandler(),
    );

    if (!rolesValidos || rolesValidos.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const usuario = request.user as Usuario;

    if (!usuario) throw new BadRequestException('No se encontró el usuario');

    for (const rol of usuario.roles) {
      if (rolesValidos.includes(rol)) return true;
    }

    throw new ForbiddenException(
      `Sólo los usuarios con los siguientes roles pueden tener acceso a este recurso: ${rolesValidos}`,
    );
  }
}
