import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  //return { ...usuario, token: this.getJwtToken({ email: usuario.email }) };
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    private readonly jwtService: JwtService,
  ) {}

  async crear(crearUsuarioDTO: CrearUsuarioDto) {
    try {
      const { password, ...datosUsuario } = crearUsuarioDTO;

      const usuario = this.usuarioRepository.create({
        ...datosUsuario,
        password: bcrypt.hashSync(password, 10),
      });

      await this.usuarioRepository.save(usuario);

      //return { ...usuario, token: this.getJwtToken({ email: usuario.email }) };
      return {
        ...usuario,
        token: this.getJwtToken({ id: usuario.id }),
      };
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async login(loginUsuarioDTO: LoginUsuarioDto) {
    const { password, email } = loginUsuarioDTO;

    const usuario = await this.usuarioRepository.findOne({
      where: { email },
      select: { id: true, email: true, password: true },
    });

    if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    //return { ...usuario, token: this.getJwtToken({ email: usuario.email }) };
    return {
      ...usuario,
      token: this.getJwtToken({ id: usuario.id }),
    };
  }

  async verificarEstado(usuario: Usuario) {
    return {
      ...usuario,
      token: this.getJwtToken({ id: usuario.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBError(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    console.log(error);

    throw new InternalServerErrorException('Rivisar logs del servidor');
  }
}
