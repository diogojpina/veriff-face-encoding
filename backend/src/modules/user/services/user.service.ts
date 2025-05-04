import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create.user.dto';
import { hash } from '../../../common/utils';
import { PrismaService } from '@/prisma';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    dto.password = await hash(dto.password);
    return await this.prisma.user.create({
      data: { ...dto },
    });
  }
}
