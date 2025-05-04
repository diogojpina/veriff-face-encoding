import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { environment } from 'src/config';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secretOrPrivateKey: environment.JWT.SECRET,
          signOptions: {
            expiresIn: environment.JWT.TTL,
          },
        };
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
