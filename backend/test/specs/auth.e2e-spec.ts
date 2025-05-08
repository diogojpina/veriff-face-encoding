import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';

import * as dotenv from 'dotenv';
import * as path from 'path';
import { LoginDto } from 'src/modules/auth/dtos';

const envPath = path.resolve(process.cwd(), '.env.test.local');
dotenv.config({ path: envPath });

describe('test /auth', () => {
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
  });

  it('login', async () => {
    await prisma.user.create({
      data: {
        email: 'diogojpina@gmail.com',
        name: 'Diogo',
        password:
          '$2b$10$ERV7t2mDCi41Pa2rru7EhurfFVh2iBQi41pg3m/Xzc46.hQs1EL/m',
      },
    });

    const dto: LoginDto = {
      email: 'diogojpina@gmail.com',
      password: '123456',
    };

    const response = await request(await app.getHttpServer())
      .post('/auth/login')
      .send(dto);

    expect(response.statusCode).toBe(201);
  });
});
