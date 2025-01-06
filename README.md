<p align="center">
  <a href="" target="blank"><img src="docs/img/compree_logo.png" width="200" alt="Compree Logo" /></a>
</p>

  <p align="center">
    Projeto usado durante o curso de NestJS da <a href="https://cursos.alura.com.br" target="_blank">Alura</a>.
  <p align="center">

  <a href="https://www.npmjs.com/" target="_blank"><img src="https://img.shields.io/badge/npm-v9.8.1-white?style=for-the-badge&logo=npm&logoColor=61DAFB" alt="NPM Version">
  <a href='https://nodejs.org/' target='_blank'><img src="https://img.shields.io/badge/Node.js-v18.18.0-white?style=for-the-badge&logo=node.js&logoColor=green">
  <a href='https://nestjs.com/' target='_blank'><img src="https://img.shields.io/badge/Nest.js-E0234E?style=for-the-badge&logo=NestJs&logoColor=white">
  <a href='https://typeorm.io/' target='_blank'><img src="https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logo=TypeORM&logoColor=white"/></a>
  <a href='https://www.postgresql.org/' target='_blank'><img src="https://img.shields.io/badge/PostgreSQL-F6F5F2?style=for-the-badge&logo=postgresql&logoColor=blue"/></a>
  <a href='https://www.docker.com/' target='_blank'><img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/></a>
</p>

## Descrição

**Compree** é uma loja fictícia usada durante os estudos de NestJS. Esse projeto constrói uma API RestFul usando o framework NestJS na construção da aplicação, Docker na construção das dependências de infraestrutura, PosgreSQL para a persistência de dados em conjunto com TypeORM como mapeador de objetos para integração com o banco.

## Instalação

```bash
npm install
```

## Executando

Subindo o as dependencia com `docker-compose`

```bash
docker compose up -d
```

Executando a aplicação

```bash
# development
npm run start

# watch mode
npm run start:dev
```
