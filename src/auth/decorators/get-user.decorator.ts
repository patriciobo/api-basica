import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const usuario = request.user;
    if (!usuario)
      throw new InternalServerErrorException(
        'No se encontró el usuario en la request',
      );

    return !data ? usuario : usuario[data];
  },
);
