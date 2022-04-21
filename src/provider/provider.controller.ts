import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { customValidationPipe } from 'src/utilities';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(customValidationPipe)
  create(@Body() createProviderDto: CreateProviderDto, @Req() req) {
    const { userId } = req.user;
    return this.providerService.create(createProviderDto, userId);
  }

  @Get()
  findAll() {
    return this.providerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.providerService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(customValidationPipe)
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProviderDto: UpdateProviderDto,
    @Req() req,
  ) {
    return this.providerService.update(id, updateProviderDto, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    return this.providerService.remove(id, req.user.userId);
  }
}
