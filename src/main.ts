import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TranslatorInterceptor } from './translator/interceptors/translator.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new TranslatorInterceptor());
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
