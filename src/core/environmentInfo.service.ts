import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

export enum Environment {
  Development = 'dev',
  Production = 'prod',
  None = '',
}

@Injectable()
export class EnvironmentInfo {
  static env: Environment =
    (process.env.NODE_ENV as Environment) ?? Environment.None;

  public static get isProductionZone(): boolean {
    return [Environment.Production].includes(EnvironmentInfo.env);
  }

  public static get isDevZone(): boolean {
    return [Environment.Development, Environment.None].includes(
      EnvironmentInfo.env,
    );
  }
}
