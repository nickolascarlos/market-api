import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req) {
    return this.authService.login(req);
  }

  @Get('tick')
  @UseGuards(JwtAuthGuard)
  tick(@Req() req) {
    return this.authService.tick(req);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req) {
    return this.authService.me(req);
  }

  @Get('log')
  @UseGuards(JwtAuthGuard)
  retrieveUserAuthenticationsLog(@Req() req) {
    return this.authService.getUserAuthenticationsLog(req.user.userId);
  }
}
