import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './interfaces/cloudinary-response';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('cloudinary.cloud_name'),
      api_key: this.configService.get('cloudinary.api_key'),
      api_secret: this.configService.get('cloudinary.api_secret'),
    });
  }

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result as CloudinaryResponse);
        },
      );

      upload.end(file.buffer);
    });
  }
}
