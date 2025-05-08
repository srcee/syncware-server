import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentInfo } from './environmentInfo.service';
import { AppClusterService } from './appCluster.service';
import { GlobalErrorFilter } from './globalError.filter';
import { LoggerService } from './logger.service';
import { Stopwatch } from './stopwatch';

@Module({
  imports: [ConfigModule],
  providers: [
    AppClusterService,
    EnvironmentInfo,
    GlobalErrorFilter,
    LoggerService,
    Stopwatch,
  ],
  exports: [
    AppClusterService,
    EnvironmentInfo,
    GlobalErrorFilter,
    LoggerService,
    Stopwatch,
  ],
})
export class CoreModule {}
