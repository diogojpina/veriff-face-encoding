import { Module } from '@nestjs/common';
import { FaceEncodingController } from './controllers/face.encoding.controller';
import { FaceEncodingService } from './services/face.encoding.service';

@Module({
  controllers: [FaceEncodingController],
  providers: [FaceEncodingService],
})
export class FaceEncodingModule {}
