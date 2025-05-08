import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  FaceEncodingSession,
  FaceEncodingStatus,
  PrismaClient,
  User,
} from '@prisma/client';
import { AppModule } from '../../src/app.module';
import { TestUtil } from '../util/test.util';
import * as request from 'supertest';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { JwtModule } from '@nestjs/jwt';
import { environment } from '../../src/config';
import * as fs from 'fs';

const envPath = path.resolve(process.cwd(), '.env.test.local');
dotenv.config({ path: envPath });

const testImage = '../fixtures/images/test.jpg';

describe('test /face-encoding', () => {
  let prisma: PrismaClient;
  let app: INestApplication;
  let testUtil: TestUtil;
  let user: User;
  const sessions: FaceEncodingSession[] = [];

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

    user = await prisma.user.create({
      data: {
        email: 'diogojpina@gmail.com',
        name: 'Diogo',
        password: '',
      },
    });

    sessions.push(
      await prisma.faceEncodingSession.create({
        data: {
          userId: user.id,
          status: FaceEncodingStatus.PENDING,
        },
      }),
    );

    sessions.push(
      await prisma.faceEncodingSession.create({
        data: {
          userId: user.id,
          status: FaceEncodingStatus.COMPLETED,
        },
      }),
    );

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        JwtModule.register({
          global: true,
          secret: environment.JWT.SECRET,
          signOptions: { expiresIn: '7d' },
        }),
      ],
      providers: [TestUtil],
    }).compile();

    app = moduleRef.createNestApplication();

    testUtil = moduleRef.get<TestUtil>(TestUtil);

    await app.init();
  }, 10000);

  it('list-sessions', async () => {
    const jwtToken = await testUtil.createAdminToken(user);

    const response = await request(await app.getHttpServer())
      .get('/face-encoding')
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(response.statusCode).toBe(200);
    const data: FaceEncodingSession[] = response.body;
    expect(data.length).toBe(2);
  });

  it('get-session', async () => {
    const jwtToken = await testUtil.createAdminToken(user);

    const response = await request(await app.getHttpServer())
      .get(`/face-encoding/${sessions[0].id}`)
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(response.statusCode).toBe(200);
    const data: FaceEncodingSession = response.body;
    expect(data.id).toBe(sessions[0].id);
  });

  it('create-session', async () => {
    const jwtToken = await testUtil.createAdminToken(user);
    const response = await request(await app.getHttpServer())
      .post('/face-encoding')
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(response.statusCode).toBe(201);
  });

  it('upload-image', async () => {
    const buffer = Buffer.from(testImage);

    const jwtToken = await testUtil.createAdminToken(user);
    const response = await request(await app.getHttpServer())
      .post(`/face-encoding/uploadImage/${sessions[0].id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .set('Content-Type', 'multipart/form-data')
      // .attach('file', buffer, 'test.jpg')
      .attach(
        'file',
        '/projects/challenge/veriff/backend/test/fixtures/images/pic.jpeg',
      );

    expect(response.statusCode).toBe(201);
  });
});
