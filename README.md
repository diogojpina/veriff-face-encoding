# Description

This project is a Face Encoding product to Veriff's customers.

The APP is running on [https://app.veriff.coderlab.com.br/](https://app.veriff.coderlab.com.br/).

The API is running on [https://api.veriff.coderlab.com.br](https://api.veriff.coderlab.com.br).

## Features implementated

Face Encoding

- List face encoding sessions
- Get a face encoding session (summary)
- Start a face encoding session
- Upload image to a face encoding session

User

- Create an user

Auth

- Login

## Technologies

### Backend

- Node 20
- [NestJS 11](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/ladjs/supertest)
- [multer](https://www.npmjs.com/package/multer)
- [mongodb](https://www.mongodb.com/)

### Frontend

- Node 20
- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router Dom](https://reactrouter.com/)
- [Chakra 2](https://v2.chakra-ui.com/)

## Documentation

You can access the live API documentation on [Swagger](https://api.veriff.coderlab.com.br/docs)

## Backend Setup

## Install, Compile and run the project

```bash
# install dependencies
$ yarn install
```

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod

# build
$ yarn run build
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e:management-group
$ yarn run test:e2e:expense

# test coverage
$ yarn run test:cov
```

## Frontend Setup

```bash
# install dependencies
$ yarn install
```

```bash
# development
$ yarn run dev

# build
$ yarn run build
```

## Install, Compile and run the project

## Deployment

We are deploying this app into [Contabo VPS](https://contabo.com/en/vps), we are using Nginx and PM2. To create a build and deploy it, you have to create an Nginx vhost to redirect requests to [PM2](https://pm2.keymetrics.io).

```bash
$ yarn build
$ cd dist
$ pm2 start main.js --name api_veriff -i max
```

Then, you have to start Face Encoder service into the docker-file.yaml. Inside of projects path, run and wait a few seconds to start the services.

```bash
$ docker compose up -d
```

## Stay in touch

- Author - [Diogo Pina](http://linkedin.com/in/diogojpina)
