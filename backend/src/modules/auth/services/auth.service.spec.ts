import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/services/user.service';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

const user: User = {
  id: '6814da8c52536908b84bdb69',
  name: 'Diogo Pina',
  email: 'diogojpina@gmail.com',
  password: '$2b$10$ERV7t2mDCi41Pa2rru7EhurfFVh2iBQi41pg3m/Xzc46.hQs1EL/m',
};

const userServiceMock = {
  findByEmail: jest.fn(),
};

const jwtServiceMock = {
  sign: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return an user', async () => {
      const accessToken = 'access_token';

      userServiceMock.findByEmail.mockResolvedValue(user);
      jwtServiceMock.sign.mockReturnValue(accessToken);

      expect(
        (await service.login({ email: user.email, password: '123456' }))
          .access_token,
      ).toBe(accessToken);
    });
  });
});
