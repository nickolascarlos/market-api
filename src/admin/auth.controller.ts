import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('log')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  retrieveAuthenticationsLog() {
    return this.authService.getAuthenticationsLog();
  }
}
