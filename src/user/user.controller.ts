import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
import { RoleGuard } from 'src/auth/guards/role.guard';
import { UpdateUserPasswordDto } from './dto/update-password.dto';

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

  @Get()
  @UseGuards(JwtAuthGuard)
  findOne(@Req() req) {
    return this.userService.findOne(req.user.userId, true);
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
  changePassword(@Body() payload: UpdateUserPasswordDto, @Req() req) {
    return this.userService.changePassword(payload, req.user.userId);
  }
}
