import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
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

  @Get('log/:user_id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  retrievUserAuthenticationsLog(
    @Param('user_id', ParseUUIDPipe) userId: string,
  ) {
    return this.authService.getUserAuthenticationsLog(userId);
  }
}
