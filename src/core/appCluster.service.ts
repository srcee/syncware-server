import cluster from 'node:cluster';
import * as os from 'os';
import { Injectable } from '@nestjs/common';

import { LoggerService } from './logger.service';

@Injectable()
export class AppClusterService {
  private static readonly numCPUs = os.cpus().length;

  static clusterize(callback: () => void, logger: LoggerService) {
    if (cluster.isPrimary) {
      logger.log(`Master server started on ${process.pid}`);
      for (let i = 0; i < this.numCPUs; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker) => {
        logger.log(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork();
      });
    } else {
      logger.log(`Cluster server started on ${process.pid}`);
      callback();
    }
  }
}
