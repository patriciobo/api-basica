import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { GetUser } from './decorators/get-user.decorator';
import { Usuario } from './entities/usuario.entity';
import { RolUsuarioGuard } from './guards/rol-usuario/rol-usuario.guard';
import { RolesAutorizados } from './decorators/roles-autorizados.decorator';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registrar')
  crear(@Body() crearUsuarioDTO: CrearUsuarioDto) {
    return this.authService.crear(crearUsuarioDTO);
  }

  @Post('login')
  loginUsuario(@Body() loginUsuarioDTO: LoginUsuarioDto) {
    return this.authService.login(loginUsuarioDTO);
  }

  @Get('verificar-estado')
  @Auth()
  verificarEstadoAutenticacion(@GetUser() usuario: Usuario) {
    return this.authService.verificarEstado(usuario);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  //AuthGuard usa por defecto la funcion validate() de nuestra jwtstrategy, la cual setea al usuario en la propiedad 'user' de la request
  testEndpointPrivado(
    @GetUser() usuario: Usuario,
    @GetUser('email') email: string,
  ) {
    return { ok: true, usuario: usuario, email: email };
  }

  @Get('private2')
  @RolesAutorizados()
  //En Guards personalizados no se crea una nueva instancia ni se llama a la funcion
  @UseGuards(AuthGuard(), RolUsuarioGuard)
  rutaPrivada2(@GetUser() usuario: Usuario) {
    return {
      ok: true,
      user: usuario,
    };
  }

  @Get('private3')
  //Este decorador es una composicion de otros decoradores + un guard
  @Auth()
  rutaPrivada3(@GetUser() usuario: Usuario) {
    return {
      ok: true,
      user: usuario,
    };
  }
}
