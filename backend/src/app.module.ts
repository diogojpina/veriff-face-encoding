import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { FaceEncodingModule } from './modules/face-encoding/face.encoding.module';

@Module({
  imports: [UserModule, AuthModule, FaceEncodingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
