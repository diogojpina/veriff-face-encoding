import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class TestUtil {
  constructor(private readonly jwtService: JwtService) {}

  async createAdminToken(user: User): Promise<string> {
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };

    return await this.jwtService.signAsync(payload);
  }
}
