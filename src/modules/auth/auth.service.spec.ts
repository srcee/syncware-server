/// <reference types="jest" />

import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from '../password/password.service';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: {
    findOneForAuthByUserName: jest.Mock;
    findOne: jest.Mock;
  };
  let passwordService: {
    dummyHash: string;
    comparePasswords: jest.Mock;
  };

  beforeEach(async () => {
    userService = {
      findOneForAuthByUserName: jest.fn(),
      findOne: jest.fn(),
    };
    passwordService = {
      dummyHash: '$argon2id$dummy',
      comparePasswords: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
        { provide: PasswordService, useValue: passwordService },
        { provide: JwtService, useValue: { sign: jest.fn() } },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('compares against the dummy hash when the username is unknown', async () => {
    userService.findOneForAuthByUserName.mockResolvedValue(null);
    passwordService.comparePasswords.mockResolvedValue(false);

    await expect(
      service.validateUser('missing', 'any-password'),
    ).resolves.toBeNull();

    expect(passwordService.comparePasswords).toHaveBeenCalledWith(
      'any-password',
      passwordService.dummyHash,
    );
    expect(userService.findOne).not.toHaveBeenCalled();
  });

  it('returns the user without the password hash after a successful login', async () => {
    const user = {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin',
      passwordHash: '$argon2id$hash',
    };
    userService.findOneForAuthByUserName.mockResolvedValue(user);
    userService.findOne.mockResolvedValue({
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin',
    });
    passwordService.comparePasswords.mockResolvedValue(true);

    const result = await service.validateUser('admin', 'secret-password');

    expect(result).toEqual({
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin',
    });
    expect(result).not.toHaveProperty('passwordHash');
  });
});
