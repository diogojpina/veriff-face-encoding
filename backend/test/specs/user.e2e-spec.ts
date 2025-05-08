import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { AppModule } from '../../src/app.module';
import { CreateUserDto } from '../../src/modules/user/dtos/create.user.dto';
import * as request from 'supertest';

import * as dotenv from 'dotenv';
import * as path from 'path';

const envPath = path.resolve(process.cwd(), '.env.test.local');
dotenv.config({ path: envPath });

describe('test /user', () => {
  let prisma: PrismaClient;
  let app: INestApplication;

  beforeAll(async () => {
    const urlConnection = process.env.DATABASE_URL;
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: urlConnection,
        },
      },
    });

    await prisma.faceEncodingSession.deleteMany();
    await prisma.user.deleteMany();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  }, 10000);

  it('create-user', async () => {
    const dto: CreateUserDto = {
      email: 'diogojpina@gmail.com',
      name: 'Diogo',
      password: '123456',
    };

    const response = await request(await app.getHttpServer())
      .post('/user')
      .send(dto);

    const userDb = await prisma.user.findFirst();
    expect(response.statusCode).toBe(201);
    expect(userDb?.email).toBe(dto.email);
    expect(userDb?.name).toBe(dto.name);
  });
});
