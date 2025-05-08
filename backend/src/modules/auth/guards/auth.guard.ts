import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { IS_PRIVATE_PUBLIC, IS_PUBLIC } from '../../../common';
import { environment } from '../../../config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request.headers);

    const isPrivatePublic = this.reflector.getAllAndOverride<boolean>(
      IS_PRIVATE_PUBLIC,
      [context.getHandler(), context.getClass()],
    );

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic && !isPrivatePublic) return true;

    if (isPrivatePublic && !token) return true;

    try {
      if (!token) return false;

      const payload = await this.jwtService.verifyAsync<UserRequestEntity>(
        token,
        {
          secret: environment.JWT.SECRET,
        },
      );

      request['user'] = payload.user;

      return true;
    } catch {
      return false;
    }
  }

  private extractTokenFromHeader(headers: any): string | undefined {
    if (!headers?.authorization) return undefined;

    const [type, authorization] = headers.authorization?.split(' ');

    return type === 'Bearer' ? authorization : undefined;
  }
}

export class UserRequestEntity extends Request {
  user: User;
}
