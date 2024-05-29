import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { Repository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Usuario } from '../entities/usuario.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Usuario> {
    //const { email } = payload;
    const { id } = payload;

    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario || !usuario.estaActivo)
      throw new UnauthorizedException('Token inválido');

    return usuario;
  }
}
