import { PrismaService } from '@/prisma';
import { EncoderService } from '@app/encoder';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  FaceEncoding,
  FaceEncodingSession,
  FaceEncodingSessionStatus,
  FaceEncodingStatus,
  User,
} from '@prisma/client';

@Injectable()
export class FaceEncodingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encoderService: EncoderService,
  ) {}

  public async listSessions(user: User): Promise<FaceEncodingSession[]> {
    const sessions = await this.prisma.faceEncodingSession.findMany({
      where: { user: { id: user.id } },
    });

    return sessions;
  }

  public async getSession(
    id: string,
    user: User,
  ): Promise<FaceEncodingSession> {
    const session = await this.prisma.faceEncodingSession.findUnique({
      where: { id },
    });

    if (!session)
      throw new HttpException('Session not foud!.', HttpStatus.BAD_REQUEST);

    if (session.userId !== user.id)
      throw new HttpException(
        `Not allowed to access session ${id}!.`,
        HttpStatus.FORBIDDEN,
      );

    return session;
  }

  public async startSession(user: User): Promise<FaceEncodingSession> {
    const session = await this.prisma.faceEncodingSession.create({
      data: {
        userId: user.id,
        status: FaceEncodingSessionStatus.PENDING,
      },
    });

    return session;
  }

  public async uploadImage(
    id: string,
    file: Express.Multer.File,
    user: User,
  ): Promise<FaceEncoding> {
    const session = await this.getSession(id, user);

    this.validateMaxImages(session);

    const imageEncoded = await this.encoderService.encode(file);

    this.validateMaxImages(session);

    const encoding: FaceEncoding = {
      file: file.originalname,
      encode: imageEncoded,
      status: FaceEncodingStatus.COMPLETED,
    };

    session.encodings.push(encoding);

    await this.prisma.faceEncodingSession.update({
      where: { id: session.id },
      data: {
        encodings: session.encodings,
      },
    });

    return encoding;
  }

  private validateMaxImages(session: FaceEncodingSession): void {
    if (session.encodings.length >= 5) {
      throw new HttpException(
        'You have already sent 5 images to this session',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
