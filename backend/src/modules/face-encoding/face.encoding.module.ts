import { Module } from '@nestjs/common';
import { FaceEncodingController } from './controllers/face.encoding.controller';
import { FaceEncodingService } from './services/face.encoding.service';
import { PrismaModule } from '@/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [FaceEncodingController],
  providers: [FaceEncodingService],
})
export class FaceEncodingModule {}
