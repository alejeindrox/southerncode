# Southerncode Challenge API in NestJS 10
![License](https://img.shields.io/badge/License-MIT-8fbe1a?labelColor=5c5c5d&style=flat)
![Node](https://img.shields.io/badge/Node-%3E=%20v18.0.0-2282c3?labelColor=5c5c5d&style=flat)
![pnpm](https://img.shields.io/badge/pnpm-%3E=%20v7.8.0-50c62a?labelColor=5c5c5d&style=flat)
![coverage](https://img.shields.io/badge/coverage-85%25-50c62a?labelColor=5c5c5d&style=flat)
![docker](https://img.shields.io/badge/docker-%3E=%20v20-f84d62?labelColor=5c5c5d&style=flat)
![author](https://img.shields.io/badge/author-@alejeindrox-49b382?labelColor=5c5c5d&style=flat)


## 1. Getting started

### 1.1 Requirements
Before starting, make sure you have at least those components on your workstation:

- An up-to-date release of [NodeJS](https://nodejs.org/)
- if you do not have pnpm installed, please check the documentation: [pnpm](https://pnpm.io/es/installation)
- It's useful for advanced testing and image building, although it is not required for development: [Docker](https://www.docker.com/)

### 1.2 Project configuration
Start by cloning this project on your workstation.

``` sh
$ git clone https://github.com/alejeindrox/southerncode.git southerncode
```

The next thing will be to install all the dependencies of the project.

```sh
$ cd ./southerncode
$ pnpm install
```

Once the dependencies are installed, you can now configure your project by creating a new `.env` file containing your environment variables used for development.

```sh
$ cp .env.example .env
$ vi .env
```

### 1.3 Launch and discover
You are now ready to launch the NestJS application using the command below.

```sh
# If you are using docker, run database to start a postgres service
$ docker-compose up -d postgres
#Or start postgres in your machine before run migrations or launch the server

# Perform migrations in your database using TypeORM
$ pnpm run migration:run

# Launch the development server with TSNode
$ pnpm run start
```

#### PgAdmin - local access:
- email: admin@admin.com
- password: 123456

#### PgAdmin - Server config:
- Hostname / Address: db

## 2. Project structure

```sh
src/
  ├── app.controller.spec.ts
  ├── app.controller.ts
  ├── app.module.ts
  ├── app.service.ts
└── database/ # TypeORM and Database config for the whole  application
    ├── config.ts
    ├── data-source.ts
    ├── database.module.ts
  └── migrations/ # TypeORM migrations created using "npm run migration:create"
      ├── 1693240041676-init.ts
      ├── 1693247969689-add-tmdbId-column-movies-table.ts
      ├── 1693281932146-modify-index-column-movies-table.ts
    ├── test-database-options.ts
  ├── main.ts
└── movie/ # A module example that manages "movie" resources
  └── controllers/
      ├── movie.controller.spec.ts
      ├── movie.controller.ts
  └── dtos/ # The model that is used in the request
      ├── create-movie.dto.ts
      ├── index.ts
      ├── update-movie.dto.ts
  └── entities/ # The actual TypeORM entity for the resource
      ├── movie.entity.ts
  └── interfaces/ # Data types used in the module
      ├── tmdb.interface.ts
    ├── movie.module.ts
  └── services/
      ├── movie.service.spec.ts
      ├── movie.service.ts
└── review/ # A module example that manages "review" resources
  └── controllers/
      ├── review.controller.spec.ts
      ├── review.controller.ts
  └── dtos/ # The model that is used in the request
      ├── create-review.dto.ts
      ├── index.ts
      ├── update-review.dto.ts
  └── entities/ # The actual TypeORM entity for the resource
      ├── review.entity.ts
    ├── review.module.ts
  └── services/
      ├── review.service.spec.ts
      ├── review.service.ts
└── user/ # A module example that manages "user" resources
  └── controllers/
      ├── user.controller.spec.ts
      ├── user.controller.ts
  └── dtos/ # The model that is used in the request
      ├── create-user.dto.ts
      ├── index.ts
      ├── update-user.dto.ts
  └── entities/ # The actual TypeORM entity for the resource
      ├── user.entity.ts
  └── services/
      ├── user.service.spec.ts
      ├── user.service.ts
    ├── user.module.ts
└── utils/ # The utils module contains pipes and filters, used in the application
    ├── rating-validation.pipe.ts
    ├── reviews-exception.filter.ts
```

## 3. Default NPM commands

The NPM commands below are already included with this template and can be used to quickly run, build and test your project.

```sh
# Start the application without Docker (Setup the datbase variables)
$ pnpm run start

# Run only Database
$ docker-compose up -d postgres

# Run Database + PgAdmin
$ docker-compose up -d postgres pgadmin

# Run the whole containers of the application
$ docker-compose up -d

# Run the project functional tests
$ pnpm run test

# Create a new migration named MIGRATION_NAME
$ NAME=MIGRATION_NAME pnpm api:migrations:generate

# Run the TypeORM migrations
$ pnpm run migration:run

# show the TypeORM migrations
$ pnpm migrations:show
```

## 4. Project goals

The goal of this project is to provide a REST API project built with NestJS for a Southerncode Challenge.

## 5. Roadmap

The following improvements are currently in progress : 

- [x] Configuration validation
- [x] Dockerfile improvements and better usage of environment variables
- [x] Project structure documentation
- [x] TypeORM migration support
- [x] Unit Test for each module

## 6. Resources

### 6.1 Hosts
- API: [http://localhost:3000](http://localhost:3000)
- API Documentation (Swagger): [http://localhost:3000/docs](http://localhost:3000/docs)
- PgAdmin: [http://localhost:9090](http://localhost:9090)
