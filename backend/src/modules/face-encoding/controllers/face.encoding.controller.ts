import { Controller, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/common';
import { FaceEncodingService } from '../services/face.encoding.service';

@Controller('face-encoding')
@ApiBearerAuth()
export class FaceEncodingController {
  public constructor(
    private readonly faceEncodingService: FaceEncodingService,
  ) {}

  @Post()
  startSession(@CurrentUser() user: User) {
    return this.faceEncodingService.startSession(user);
  }
}
