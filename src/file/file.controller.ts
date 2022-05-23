import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { memoryStorage } from 'multer';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 1024 * 512 },
    }),
  )
  create(@UploadedFile() uploadedFile: Express.Multer.File, @Req() req) {
    return this.fileService.create(uploadedFile, req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res) {
    return this.fileService.findOne(id, res);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req) {
    return this.fileService.remove(id, req.user.userId);
  }
}
