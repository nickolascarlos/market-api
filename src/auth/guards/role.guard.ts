import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import translator from 'src/translatorInstance';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const acceptLanguage = context.switchToHttp().getRequest().headers[
      'accept-language'
    ];
    const { userRole } = context.switchToHttp().getRequest().user;
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles)
      throw translator.translateError(
        'In a role-protected route, roles must be specified with @Roles(...) decorator',
        acceptLanguage,
      );

    return requiredRoles.includes(userRole);
  }
}
