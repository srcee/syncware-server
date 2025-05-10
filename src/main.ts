import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppClusterService } from './core/appCluster.service';
import { EnvironmentInfo } from './core/environmentInfo.service';
import { LoggerService } from './core/logger.service';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
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
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggerService);

  if (EnvironmentInfo.isProductionZone) {
    AppClusterService.clusterize(bootstrap, logger);
  } else {
    await bootstrap();
  }
}

startApp();
