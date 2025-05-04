import { Module } from '@nestjs/common';
import { EncoderService } from './services/encoder.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
  ],
  providers: [EncoderService],
  exports: [EncoderService],
})
export class EncoderModule {}
