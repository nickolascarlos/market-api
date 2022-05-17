import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
  ) {}

  async create(uploadedFile: Express.Multer.File, userId: string) {
    const file: File = new File();
    file.id = uploadedFile.filename;
    file.originalName = uploadedFile.originalname;
    file.mimeType = uploadedFile.mimetype;
    file.userId = userId;

    return await file.save();
  }

  // respond parameter sets whether this function should send (respond
  // with) the file or return the file entity.
  async findOne(id: string, res, respond = true) {
    const file: File = await this.fileRepository.findOneOrFail(id).catch(() => {
      throw new NotFoundException('No file with such id');
    });

    if (respond)
      return res
        .setHeader('content-type', file.mimeType)
        .sendFile(`${id}`, { root: './files' });

    return file;
  }

  async remove(id: string, userId: string) {
    const file: File = await this.findOne(id, null, false);

    if (file.userId !== userId)
      return 'The specified file does not belong to the logged-in user';

    await file.remove();
  }
}
