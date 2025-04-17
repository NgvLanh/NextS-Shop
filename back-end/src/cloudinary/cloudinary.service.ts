import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CloudinaryService {
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
