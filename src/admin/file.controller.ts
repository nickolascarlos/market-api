import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { FileService } from 'src/file/file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  findAll() {
    return this.fileService.findAll();
  }
}
