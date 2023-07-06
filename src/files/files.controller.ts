import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { fileNamer, fileFilter } from './helpers';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('events/:imageName')
  findEventImage(@Res() res: Response, @Param('imageName') imageName: string) {
    const path = this.filesService.getStaticEventImage(imageName);

    res.sendFile(path);
  }

  @Post('events')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/events',
        filename: fileNamer,
      }),
    }),
  )
  uploadEventImage(@UploadedFile() file: Express.Multer.File) {
    console.log('entramos...');
    console.log(file);

    if (!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }
    const secureUrl = `${this.configService.get('HOST_API')}/files/events/${
      file.filename
    }`;
    return { secureUrl };
  }
}
