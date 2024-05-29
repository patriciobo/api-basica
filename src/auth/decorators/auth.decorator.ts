import { AuthGuard } from '@nestjs/passport';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { RolesValidos } from '../interfaces/roles-validos';
import { RolesAutorizados } from './roles-autorizados.decorator';
import { RolUsuarioGuard } from '../guards/rol-usuario/rol-usuario.guard';

export function Auth(...roles: RolesValidos[]) {
  return applyDecorators(
    RolesAutorizados(...roles),
    UseGuards(AuthGuard(), RolUsuarioGuard),
  );
}
