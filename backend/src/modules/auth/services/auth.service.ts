import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/services/user.service';
import { LoginDto } from '../dtos';
import { compare } from 'bcrypt';
import { environment } from 'src/config';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user.password)
      throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);

    const passwordIsEqual = await compare(loginDto.password, user.password);

    if (!passwordIsEqual)
      throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);

    const access_token = this.createAccessToken(user);

    return access_token;
  }

  private createAccessToken(user: User) {
    const access_token = this.jwtService.sign({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });

    return {
      expires_in: environment.JWT.TTL,
      access_token,
      type: 'Bearer',
    };
  }
}
