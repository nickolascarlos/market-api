import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Req } from '@nestjs/common';
import { customValidationPipe } from 'src/utilities';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(customValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':user_id/providers/:offset?/:limit?')
  findUserProviders(
    @Param('user_id') userId: string,
    @Param('offset') offset = 0,
    @Param('limit') limit = 25,
  ) {
    return this.userService.findUserProviders(userId, +offset, +limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Patch()
  @UsePipes(customValidationPipe)
  @UseGuards(JwtAuthGuard)
  update(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    const { userId: loggedInUserId } = req.user;
    return this.userService.update(loggedInUserId, updateUserDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  remove(@Req() req) {
    return this.userService.remove(req.user.userId);
  }

  @Patch('change-password')
  @UsePipes(customValidationPipe)
  @UseGuards(JwtAuthGuard)
  changePassword(@Body() payload, @Req() req) {
    return this.userService.changePassword(payload, req.user.userId);
  }
}
