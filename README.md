<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Exec in dev

1. Clonar el repositorio
2. Ejecutar
```
yarn install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```

5. Clonar archivo ```env.sample``` y renombrar copia ```.env```


6. Cargar la lista de pokemons si esta vacia

```
http://localhost:3000/api/v2/seed
```
7. Ejecutar la aplicacion con el comando

``` 
yarn start:dev 
```

## Stack usado
* MongoDB
* Nest


