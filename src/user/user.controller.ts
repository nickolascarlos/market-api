import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  HttpCode,
  UseInterceptors,
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
import { RequestPasswordChangeDto } from './dto/request-password-change.dto';
import { TranslatorInterceptor } from 'src/translator/interceptors/translator.interceptor';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(customValidationPipe)
  @UseInterceptors(TranslatorInterceptor)
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
  changePassword(@Body() payload: UpdateUserPasswordDto) {
    return this.userService.changePassword(payload);
  }

  @Post('request-password-change')
  @UsePipes(customValidationPipe)
  @HttpCode(200)
  requestPasswordChange(@Body() payload: RequestPasswordChangeDto) {
    return this.userService.requestPasswordChange(payload);
  }

  @Get('check-email-availability/:email')
  checkEmailAvailability(@Param('email') email) {
    return this.userService.checkEmailAvailability(email);
  }
}
