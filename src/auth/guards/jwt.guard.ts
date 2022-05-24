import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import translator from 'src/translatorInstance';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context, status) {
    const acceptLanguage = context.getRequest().headers['accept-language'];

    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException(
          translator.translateError('Invalid credentials', acceptLanguage),
        )
      );
    }

    return user;
  }
}
