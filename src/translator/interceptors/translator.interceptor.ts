import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import translator from 'src/translatorInstance';

@Injectable()
export class TranslatorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const acceptLanguage: string = context.switchToHttp().getRequest().headers[
      'accept-language'
    ];
    return next.handle().pipe(
      catchError((err) => {
        console.log(err);
        if (!(err instanceof HttpException)) throw err;

        const response = err.getResponse();

        if (err instanceof BadRequestException) {
          response['message'] =
            response['message'] instanceof Object
              ? translator.translateClassValidatorErrors(
                  response['message'],
                  acceptLanguage,
                )
              : translator.translateError(response['message'], acceptLanguage);
          throw new BadRequestException(response);
        }

        throw new HttpException(
          translator.translateError(response['message'], acceptLanguage),
          err.getStatus(),
        );
      }),
    );
  }
}
