import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';
import { catchError, Observable, of } from 'rxjs';
import translator from 'src/translatorInstance';

@Injectable()
export class TranslatorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const response = err.getResponse();
        console.log(response);

        if (err instanceof BadRequestException) {
          if (response instanceof Object) console.log(response['message']);
          const translatedError =
            response instanceof Object
              ? {
                  ...response,
                  message: translator.translateClassValidatorErrors(
                    response['message'],
                  ),
                }
              : err.getResponse();

          return of([translatedError]);
        }

        return of([
          {
            ...response,
            message: translator.translateError(response['message']),
          },
        ]);
      }),
    );
  }
}
