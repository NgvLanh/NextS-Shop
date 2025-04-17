// cloudinary.service.ts

import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import * as path from 'path';
import { CloudinaryResponse } from './cloudinary-response';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
  async uploadBase64(base64: string): Promise<string> {
    const cleaned = base64.split(',')[1];
    const buffer = Buffer.from(cleaned, 'base64');
    const tempPath = path.join(__dirname, 'temp.jpg');
    fs.writeFileSync(tempPath, buffer);
    const result = await cloudinary.uploader.upload(tempPath);
    fs.unlinkSync(tempPath);
    return result.secure_url;
  }
}
