import { Module } from '@nestjs/common';
import { FaceEncodingController } from './controllers/face.encoding.controller';
import { FaceEncodingService } from './services/face.encoding.service';
import { PrismaModule } from '@/prisma';
import { EncoderModule } from '@app/encoder';

@Module({
  imports: [PrismaModule, EncoderModule],
  controllers: [FaceEncodingController],
  providers: [FaceEncodingService],
})
export class FaceEncodingModule {}
