import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentInfo } from './environmentInfo.service';
import { AppClusterService } from './appCluster.service';
import { LoggerService } from './logger.service';
import { Stopwatch } from './stopwatch';

@Module({
  imports: [ConfigModule],
  providers: [AppClusterService, EnvironmentInfo, LoggerService, Stopwatch],
  exports: [AppClusterService, EnvironmentInfo, LoggerService, Stopwatch],
})
export class CoreModule {}
