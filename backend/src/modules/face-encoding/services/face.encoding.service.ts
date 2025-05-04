import { PrismaService } from '@/prisma';
import { Injectable } from '@nestjs/common';
import {
  FaceEncodingSession,
  FaceEncodingSessionStatus,
  User,
} from '@prisma/client';

@Injectable()
export class FaceEncodingService {
  constructor(private readonly prisma: PrismaService) {}

  async startSession(user: User): Promise<FaceEncodingSession> {
    const session = await this.prisma.faceEncodingSession.create({
      data: {
        userId: user.id,
        status: FaceEncodingSessionStatus.PENDING,
      },
    });

    return session;
  }
}
