import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  UsePipes,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserService } from 'src/user/user.service';
import { customValidationPipe } from 'src/utilities';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':user_id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  findOne(@Param('user_id', ParseUUIDPipe) userId) {
    return this.userService.findOne(userId);
  }

  @Patch(':user_id')
  @UsePipes(customValidationPipe)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('user_id', ParseUUIDPipe) userId,
  ) {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete(':user_id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  remove(@Param('user_id', ParseUUIDPipe) userId) {
    return this.userService.remove(userId);
  }

  @Patch(':user_id/change-password')
  @UsePipes(customValidationPipe)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  changePassword(@Body() payload, @Param('user_id', ParseUUIDPipe) userId) {
    return this.userService.changePassword(payload, userId, true);
  }
}
