import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Req, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { customValidationPipe } from 'src/utilities';
import { OffsetWithoutLimitNotSupportedError } from 'typeorm';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @UsePipes(customValidationPipe)
  @UseGuards(JwtAuthGuard)
  create(@Body() createServiceDto: CreateServiceDto, @Req() req) {
    return this.serviceService.create(createServiceDto, req.user.userId);
  }

  @Get('search/:query')
  search(@Param('query') query: string) {
    return this.serviceService.search(query);
  }
  
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.serviceService.findOne(id);
  }
  
  @Get(':offset?/:limit?')
  findAll(@Param('offset') offset: string = '0', @Param('limit') limit: string = '25') {
    return this.serviceService.findAll(+offset, +limit);
  }

  @Patch(':id')
  @UsePipes(customValidationPipe)
  @UseGuards(JwtAuthGuard)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateServiceDto: UpdateServiceDto, @Req() req) {
    return this.serviceService.update(id, updateServiceDto, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    return this.serviceService.remove(id, req.user.userId);
  }
}
