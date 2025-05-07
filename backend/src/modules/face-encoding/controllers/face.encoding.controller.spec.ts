import { Test, TestingModule } from '@nestjs/testing';
import {
  FaceEncodingSession,
  FaceEncodingSessionStatus,
  FaceEncodingStatus,
  User,
} from '@prisma/client';
import { FaceEncodingController } from './face.encoding.controller';
import { FaceEncodingService } from '../services/face.encoding.service';
import { Readable } from 'stream';

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

describe('FaceEncodingController', () => {
  let controller: FaceEncodingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FaceEncodingController],
    })
      .useMocker((token) => {
        if (token === FaceEncodingService) {
          return {
            listSessions: jest
              .fn()
              .mockResolvedValue(Promise.resolve(sessions)),
            getSession: jest
              .fn()
              .mockResolvedValue(Promise.resolve(sessions[0])),
            startSession: jest
              .fn()
              .mockResolvedValue(Promise.resolve(sessions[0])),
            uploadImage: jest
              .fn()
              .mockResolvedValue(Promise.resolve(sessions[0])),
          };
        }
      })
      .compile();

    controller = module.get<FaceEncodingController>(FaceEncodingController);
  });

  describe('list-sessions', () => {
    it('should get a list of face encoding sessions', async () => {
      expect(await controller.listSessions(user)).toBe(sessions);
    });
  });

  describe('get-session', () => {
    it('should get a face encoding session', async () => {
      expect(await controller.getSession(sessions[0].id, user)).toBe(
        sessions[0],
      );
    });
  });

  describe('start-session', () => {
    it('should start a face encoding session', async () => {
      expect(await controller.startSession(user)).toBe(sessions[0]);
    });
  });

  describe('upload-image', () => {
    it('should upload an image to face encoding session', async () => {
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

      expect(await controller.uploadImage(sessions[0].id, file, user)).toBe(
        sessions[0],
      );
    });
  });
});
