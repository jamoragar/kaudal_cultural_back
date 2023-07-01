import { join } from 'path';
import { existsSync } from 'fs';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  getStaticEventImage(imageName: string) {
    const path = join(__dirname, '../../static/events', imageName);
    if (!existsSync(path)) {
      throw new BadRequestException(`No event found with ${imageName}`);
    }
    return path;
  }
}
