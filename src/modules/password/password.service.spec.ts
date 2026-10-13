import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from './password.service';

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordService,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string, defaultValue?: number) => {
              const values: Record<string, number> = {
                ARGON2_MEMORY_COST: 8192,
                ARGON2_TIME_COST: 1,
                ARGON2_PARALLELISM: 1,
              };
              return values[key] ?? defaultValue;
            },
          },
        },
      ],
    }).compile();

    service = module.get<PasswordService>(PasswordService);
    await service.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('hashes and verifies with Argon2id', async () => {
    const hash = await service.hashPassword('correct-horse-battery');

    expect(hash.startsWith('$argon2id$')).toBe(true);
    await expect(
      service.comparePasswords('correct-horse-battery', hash),
    ).resolves.toBe(true);
    await expect(
      service.comparePasswords('wrong-password', hash),
    ).resolves.toBe(false);
  });

  it('returns false for malformed password hashes', async () => {
    await expect(
      service.comparePasswords('password', 'not-a-valid-hash'),
    ).resolves.toBe(false);
  });
});
