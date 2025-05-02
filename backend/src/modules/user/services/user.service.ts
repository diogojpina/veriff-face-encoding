import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create.user.dto';
import { hash } from '../../../common/utils';
import { PrismaService } from '@/prisma';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    dto.password = await hash(dto.password);
    return await this.prisma.user.create({
      data: { ...dto },
    });
  }
}
