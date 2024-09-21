# Tanager

[Tanager](https://github.com/JosephNK/tanager) framework TypeScript starter repository.

## Setup .env

apps/tanager

Create file `.env.development`, `.env.production`

```bash
PORT=3000
MICROSERVICE_INBOUND_PORT=3111
MICROSERVICE_OUTBOUND_PORT=3211
```

apps/inbound

Create file `.env.development`, `.env.production`

```bash
PORT=3100
MICROSERVICE_INBOUND_PORT=3111
```

apps/outbound

Create file `.env.development`, `.env.production`

```bash
PORT=3200
MICROSERVICE_OUTBOUND_PORT=3211
DATABASE_TYPE=postgres
DATABASE_URL=
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=tanager
FIREBASE_SERVICE_KEY_FILE=server_key.json
```

## Compile and run the project

```bash
# tanager (development watch mode)
$ yarn run start:dev

# inbound microservice (development watch mode)
$ yarn run start:in:dev

# outbound microservice (development watch mode)
$ yarn run start:out:dev

# tanager (production mode)
$ yarn run start:prod

# inbound microservice (production mode)
$ yarn run start:in:prod

# outbound microservice (production mode)
$ yarn run start:out:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Swagger

```bash
http://localhost:3000/docs
```
