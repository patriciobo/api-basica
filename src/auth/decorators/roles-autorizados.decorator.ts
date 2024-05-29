import { SetMetadata } from '@nestjs/common';
import { RolesValidos } from '../interfaces/roles-validos';

export const ROLES_METADATA = 'roles';

export const RolesAutorizados = (...args: RolesValidos[]) => {
  return SetMetadata(ROLES_METADATA, args);
};
