import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
  ) {}

  async create(uploadedFile: Express.Multer.File, userId: string) {
    // Verifica se o usuário tem menos de 3 arquivos
    const userFiles: [File[], number] = await File.findAndCount({
      where: { userId },
      select: ['id'],
    });

    if (userFiles[1] >= 3)
      throw new ForbiddenException('Each account can upload up to 3 files');

    let file: File = new File();
    file.originalName = uploadedFile.originalname;
    file.mimeType = uploadedFile.mimetype;
    file.userId = userId;
    file.data = uploadedFile.buffer;

    file = await file.save();
    delete file.data;

    return file;
  }

  // respond parameter sets whether this function should send (respond
  // with) the file or return the file entity.
  async findOne(id: string, res, respond = true) {
    const file: File = await this.fileRepository.findOneOrFail(id).catch(() => {
      throw new NotFoundException('No file with such id');
    });

    if (respond)
      return res.setHeader('content-type', file.mimeType).send(file.data);

    return file;
  }

  findAll() {
    return this.fileRepository.find({
      select: ['id', 'originalName', 'mimeType', 'createdAt'],
      relations: ['user'],
    });
  }

  async remove(id: string, userId: string) {
    const file: File = await this.findOne(id, null, false);

    if (file.userId !== userId)
      return 'The specified file does not belong to the logged-in user';

    await file.remove();
  }
}
