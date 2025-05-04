import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FaceEncodingSession, User } from '@prisma/client';
import { CurrentUser } from 'src/common';
import { FaceEncodingService } from '../services/face.encoding.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('face-encoding')
@ApiBearerAuth()
export class FaceEncodingController {
  public constructor(
    private readonly faceEncodingService: FaceEncodingService,
  ) {}

  @Get('')
  async listSessions(
    @Param('id') id,
    @CurrentUser() user,
  ): Promise<FaceEncodingSession[]> {
    return await this.faceEncodingService.listSessions(user);
  }

  @Get('/:id')
  async getSession(
    @Param('id') id,
    @CurrentUser() user,
  ): Promise<FaceEncodingSession> {
    return await this.faceEncodingService.getSession(id, user);
  }

  @Post()
  async startSession(@CurrentUser() user: User) {
    return await this.faceEncodingService.startSession(user);
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
