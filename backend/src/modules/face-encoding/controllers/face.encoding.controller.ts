import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/common';
import { FaceEncodingService } from '../services/face.encoding.service';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('/uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: User,
  ) {
    console.log(file);
    return await this.faceEncodingService.uploadImage(id, file, user);
  }
}
