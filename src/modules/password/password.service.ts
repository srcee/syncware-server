import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService implements OnModuleInit {
  private dummyHashValue =
    '$argon2id$v=19$m=65536,p=1,t=3$pExqKWDf4ZOqBBRDBtxlvA$F5GdxZUwkYUV8NELRSvgqd566MnJsrnCe1Lnx1CBIjI';

  constructor(private configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    this.dummyHashValue = await this.hashPassword('dummy-timing-placeholder');
  }

  get dummyHash(): string {
    return this.dummyHashValue;
  }

  async hashPassword(password: string): Promise<string> {
    return argon2.hash(password, { ...this.getArgonOptions(), raw: false });
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await argon2.verify(hashedPassword, plainPassword);
    } catch {
      return false;
    }
  }

  private getArgonOptions(): argon2.HashOptions {
    return {
      type: argon2.argon2id,
      memoryCost: this.configService.get<number>('ARGON2_MEMORY_COST', 65536),
      timeCost: this.configService.get<number>('ARGON2_TIME_COST', 3),
      parallelism: this.configService.get<number>('ARGON2_PARALLELISM', 1),
    };
  }
}
