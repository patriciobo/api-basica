import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { Usuario } from './entities/usuario.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Usuario]),
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      //Se puede importar el ConfigModule y leer la variable de entorno con .get(), inyectando la dependencia en el factory
      imports: [],
      inject: [],
      useFactory: () => {
        console.log(process.env.JWT_SECRET);
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: '2h',
          },
        };
      },
    }),
  ],

  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
