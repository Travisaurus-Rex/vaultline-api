import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import pinoHttp from 'pino-http';
import { requestIdMiddleware } from './common/middleware/request-id.middleware';
import { pinoConfig } from './common/logger/pino.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('server.port', 3000);

  app.use(requestIdMiddleware);

  app.use(
    pinoHttp({
      ...pinoConfig,
      genReqId: (req) => req.id,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port);
}
bootstrap();
