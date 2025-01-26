import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly i18n: I18nService) { }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => data
        //   ({
        //   statusCode: context.switchToHttp().getResponse().statusCode,
        //   message: this.i18n.t(`common.success.${context.switchToHttp().getResponse().statusCode}`),
        //   data: data ?? null,
        // }),
      ),
      catchError((error) => {
        console.log(error);
        throw {
          statusCode: error.status || 500,
          message: error?.response?.message,
          // message: this.i18n.t(`common.exceptions.${error.status || 500}`),
          errors: error?.response?.message,
        };
      }),
    );
  }
}
