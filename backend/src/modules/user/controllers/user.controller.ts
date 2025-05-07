import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create.user.dto';
import { User } from '@prisma/client';
import { IsPublic } from '../../../common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @IsPublic()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return await this.userService.create(dto);
  }
}
