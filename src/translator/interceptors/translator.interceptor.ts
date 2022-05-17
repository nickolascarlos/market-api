import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';
import { catchError, Observable, of } from 'rxjs';
import translator from 'src/translatorInstance';

@Injectable()
export class TranslatorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const acceptLanguage: string = context.switchToHttp().getRequest().headers[
      'accept-language'
    ];
    return next.handle().pipe(
      catchError((err) => {
        const response = err.getResponse();

        if (err instanceof BadRequestException) {
          response['message'] = translator.translateClassValidatorErrors(
            response['message'],
            acceptLanguage,
          );
          throw new BadRequestException(response);
        }

        err.response['message'] = translator.translateError(
          response['message'],
          acceptLanguage,
        );

        throw err;
      }),
    );
  }
}
