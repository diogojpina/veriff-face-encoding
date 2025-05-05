import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { FaceEncodingService } from './face.encoding.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/prisma';
import {
  FaceEncodingSession,
  FaceEncodingSessionStatus,
  FaceEncodingStatus,
  User,
} from '@prisma/client';
import { EncoderService } from '@app/encoder';
import { Readable } from 'stream';

const moduleMocker = new ModuleMocker(global);

const user: User = {
  id: '6814da8c52536908b84bdb69',
  name: 'Diogo Pina',
  email: 'diogojpina@gmail.com',
  password: '',
};

const sessions: FaceEncodingSession[] = [];

sessions.push(
  {
    id: 'abc1',
    userId: user.id,
    status: FaceEncodingSessionStatus.PENDING,
    encodings: [],
    createdAt: new Date(),
  },
  {
    id: 'abc2',
    userId: user.id,
    status: FaceEncodingSessionStatus.COMPLETED,
    encodings: [
      {
        file: 'image.jpg',
        encode: [1, 2, 3],
        status: FaceEncodingStatus.COMPLETED,
      },
    ],
    createdAt: new Date(),
  },
  {
    id: 'abc3',
    userId: user.id,
    status: FaceEncodingSessionStatus.COMPLETED,
    encodings: [
      {
        file: 'image1.jpg',
        encode: [1, 2, 3],
        status: FaceEncodingStatus.COMPLETED,
      },
      {
        file: 'image2.jpg',
        encode: [1, 2, 3],
        status: FaceEncodingStatus.COMPLETED,
      },
      {
        file: 'image3.jpg',
        encode: [1, 2, 3],
        status: FaceEncodingStatus.COMPLETED,
      },
      {
        file: 'image4.jpg',
        encode: [1, 2, 3],
        status: FaceEncodingStatus.COMPLETED,
      },
      {
        file: 'image5.jpg',
        encode: [1, 2, 3],
        status: FaceEncodingStatus.COMPLETED,
      },
    ],
    createdAt: new Date(),
  },
);

const prismaMock = {
  faceEncodingSession: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

const encoderMock = {
  encode: jest.fn(),
};

describe('FaceEncodingService', () => {
  let service: FaceEncodingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FaceEncodingService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: EncoderService,
          useValue: encoderMock,
        },
      ],
    })
      .useMocker((token) => {
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const mock = moduleMocker.generateFromMetadata(mockMetadata);
          return mock;
        }
      })
      .compile();

    service = module.get<FaceEncodingService>(FaceEncodingService);
  });

  describe('list-sessions', () => {
    it('should return list of face encoding sessions', async () => {
      prismaMock.faceEncodingSession.findMany.mockResolvedValue(sessions);

      expect(await service.listSessions(user)).toHaveLength(3);
    });
  });

  describe('get-session', () => {
    it('should return a face encoding session', async () => {
      prismaMock.faceEncodingSession.findUnique.mockResolvedValue(sessions[0]);

      expect(await service.getSession(sessions[0].id, user)).toBe(sessions[0]);
    });
  });

  describe('start-session', () => {
    it('should create and return a face encoding session', async () => {
      prismaMock.faceEncodingSession.create.mockResolvedValue(sessions[0]);

      expect(await service.startSession(user)).toBe(sessions[0]);
    });
  });

  describe('upload-image-to-session', () => {
    const file: Express.Multer.File = {
      originalname: 'image.jpg',
      fieldname: '',
      encoding: '',
      mimetype: '',
      size: 0,
      stream: new Readable(),
      destination: '',
      filename: '',
      path: '',
      buffer: Buffer.from([]),
    };

    const imageEncoded = [0.1, -0.2, 0.3];

    it('should create and return a face encoding session', async () => {
      prismaMock.faceEncodingSession.findUnique.mockResolvedValue(sessions[0]);

      encoderMock.encode.mockResolvedValue(imageEncoded);

      expect(
        (await service.uploadImage(sessions[0].id, file, user)).encode,
      ).toBe(imageEncoded);
    });

    it('should should throw max size error', () => {
      prismaMock.faceEncodingSession.findUnique.mockResolvedValue(sessions[2]);
      encoderMock.encode.mockResolvedValue(imageEncoded);

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      expect(service.uploadImage(sessions[2].id, file, user)).rejects.toThrow(
        /sent 5 images/,
      );
    });
  });
});
