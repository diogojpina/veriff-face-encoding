import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { User } from '@prisma/client';
import { CreateUserDto } from '../dtos/create.user.dto';

const user: User = {
  id: '6814da8c52536908b84bdb69',
  name: 'Diogo Pina',
  email: 'diogojpina@gmail.com',
  password: '',
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    })
      .useMocker((token) => {
        if (token === UserService) {
          return {
            create: jest.fn().mockResolvedValue(Promise.resolve(user)),
          };
        }
      })
      .compile();

    controller = module.get<UserController>(UserController);
  });

  describe('create', () => {
    it('should create an user', async () => {
      const dto = new CreateUserDto();
      dto.email = user.email;
      dto.name = user.name;
      dto.password = '123456';

      expect(await controller.create(dto)).toBe(user);
    });
  });
});
