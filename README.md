<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Gestor-Pedidos API

Pre-Requisitos:

- Node
- yarn
- Docker.

## <br>

1. Clonar proyecto

2. `yarn install`

3. Clonar archivo `.env.template` y renombrarlo a `.env`

4. Configurar las variables de entorno

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
