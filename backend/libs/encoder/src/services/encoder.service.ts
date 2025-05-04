import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as FormData from 'form-data';

@Injectable()
export class EncoderService {
  constructor(private readonly httpService: HttpService) {}

  async encode(file: Express.Multer.File): Promise<number[]> {
    if (!file) {
      throw new Error('File not uploaded!');
    }

    const filename = Date.now() + file.originalname;
    const path = '/tmp/' + filename;
    fs.writeFileSync(path, file.buffer);

    const data = new FormData();
    data.append('file', fs.createReadStream(path));

    try {
      const response = await this.httpService.axiosRef.post(
        'http://localhost:8000/v1/selfie',
        data,
        { headers: { ...data.getHeaders() } },
      );

      if (!Array.isArray(response.data))
        throw new Error('Encoder response errror.');
      if (!Array.isArray(response.data[0]))
        throw new Error('Encoder response errror.');

      return response.data[0];
    } catch (error) {
      console.log('error', error);
      throw error.message;
    }
  }
}
