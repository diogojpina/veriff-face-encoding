import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LoginDto } from '../dtos';
import { AuthService } from '../services/auth.service';

const loginResponse = {
  expires_in: 3600,
  access_token: 'access_token',
  type: 'Bearer',
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    })
      .useMocker((token) => {
        if (token === AuthService) {
          return {
            login: jest.fn().mockResolvedValue(Promise.resolve(loginResponse)),
          };
        }
      })
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should login', async () => {
      const dto = new LoginDto();
      dto.email = 'diogojpina@gmail.com';
      dto.password = '123456';

      expect(await controller.login(dto)).toBe(loginResponse);
    });
  });
});
