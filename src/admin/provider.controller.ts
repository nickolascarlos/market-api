import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateProviderDto } from 'src/provider/dto/create-provider.dto';
import { UpdateProviderDto } from 'src/provider/dto/update-provider.dto';
import { ProviderService } from 'src/provider/provider.service';
import { customValidationPipe } from 'src/utilities';

@Controller('providers')
export class ProviderController {
  constructor(private providerService: ProviderService) {}

  @Post(':user_id')
  @UsePipes(customValidationPipe)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  create(@Body() payload: CreateProviderDto, @Param('user_id') userId) {
    return this.providerService.create(payload, userId);
  }

  @Get(':offset?/:limit?')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  findAll(@Param('offset') offset = 0, @Param('limit') limit = 25) {
    return this.providerService.findAll(+offset, +limit);
  }

  @Patch(':provider_id')
  @UsePipes(customValidationPipe)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  update(
    @Body() payload: UpdateProviderDto,
    @Param('provider_id', ParseUUIDPipe) providerId,
  ) {
    return this.providerService.update(providerId, payload, null, true);
  }

  @Delete(':provider_id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  remove(@Param('provider_id') providerId) {
    return this.providerService.remove(providerId, null, true);
  }
}
