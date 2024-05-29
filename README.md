<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Template de API configurada

Incluye:

- Configuraciones:

  1. Global Pipes para validar propiedades de los DTOs inexistentes o no requeridas en las request
  2. Docker para levantar BD Postgres
  3. TypeORM en app.module utilizando variables de entorno
  4. Paginación con paginationDTO
  5. Registro y Login de Usuarios con JWT y encriptacion de contraseñas
  6. Passport asincrono con generación de JWT mediante secreto, y authGuard utilizando funcion validate() de jwtstrategy.
  7. Decorador compuesto Auth() el cual protege endpoints o controladores para que solo accedan usuarios atenticados, pudiendo especificar RolesValidos como parametro.
  8. Decorador @GetUser() el cual obtiene el usuario autenticado y lo almacena en una variable
  9. Algo de documentacion con OpenAPI (Swagger)

- Variables de entorno para BD en archivos .env y .env.template

- Decoradores de validación de class-transformer y class-validator

- CRUD básico para una entidad (producto)

- Set global prefix 'api'

- BD Con ejemplo de Relaciones OneToMany entre Producto-ImagenProducto

- Seed para poblar BD

## <br>

Pre-Requisitos:

- Node
- yarn
- Docker.

## <br>

# Instrucciones:

1. Clonar proyecto

2. `yarn install`

3. Clonar archivo `.env.template` y renombrarlo a `.env`

4. Configurar valores de variables de entorno

5. Levantar la BD

```
docker-compose up -d
```

6. Ejecutar SEED para cargar productos de prueba en BD

```
GET
localhost:3000/api/seed
```

7. Ejecutar el proyecto en modo de desarrollo:

```
yarn start:dev
```
