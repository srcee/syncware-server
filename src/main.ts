import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppClusterService } from './core/appCluster.service';
import { EnvironmentInfo } from './core/environmentInfo.service';
import { LoggerService } from './core/logger.service';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: (process.env.CORS_ORIGINS || 'http://localhost:3000')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
    credentials: false,
    allowedHeaders: [
      // default
      'Accept',
      'Authorization',
      'Content-Type',
      'If-None-Match',
    ],
    maxAge: 600,
  });

  await app.listen(process.env.PORT || 5000);
}

async function startApp() {
  const logger = new LoggerService();

  if (EnvironmentInfo.isProductionZone) {
    AppClusterService.clusterize(bootstrap, logger);
  } else {
    await bootstrap();
  }
}

startApp();
