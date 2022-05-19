import { NestFactory } from '@nestjs/core';
import { SentryService } from '@ntegral/nestjs-sentry';
import { AppModule } from './app.module';
import { TranslatorInterceptor } from './translator/interceptors/translator.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(SentryService.SentryServiceInstance());
  app.enableCors();
  app.useGlobalInterceptors(new TranslatorInterceptor());
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
