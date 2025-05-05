import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/prisma';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { CreateUserDto } from '../dtos/create.user.dto';

const moduleMocker = new ModuleMocker(global);

const user: User = {
  id: '6814da8c52536908b84bdb69',
  name: 'Diogo Pina',
  email: 'diogojpina@gmail.com',
  password: '',
};

const prismaMock = {
  user: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('find-by-email', () => {
    it('should return an user', async () => {
      prismaMock.user.findFirst.mockResolvedValue(user);

      expect(await service.findByEmail(user.email)).toBe(user);
    });
  });

  describe('create', () => {
    it('should create and return an user', async () => {
      prismaMock.user.create.mockResolvedValue(user);

      const dto: CreateUserDto = {
        email: user.email,
        name: user.name,
        password: user.password,
      };

      expect(await service.create(dto)).toBe(user);
    });
  });
});
