/// <reference types="jest" />

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, UserRole } from '../../common/entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { PasswordService } from '../password/password.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: {
    create: jest.Mock;
    save: jest.Mock;
    findOne: jest.Mock;
    update: jest.Mock;
  };
  let passwordService: {
    hashPassword: jest.Mock;
  };

  beforeEach(async () => {
    userRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
    };
    passwordService = {
      hashPassword: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepository,
        },
        {
          provide: PasswordService,
          useValue: passwordService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('associates a new user with the supplied restaurant', async () => {
    const input: CreateUserInput = {
      email: 'user@example.com',
      password: 'a-secure-password',
      username: 'new-user',
      role: UserRole.Manager,
      restaurantId: 42,
    };
    const user = {
      ...input,
      passwordHash: 'hashed-password',
      restaurant: { id: input.restaurantId },
    };

    passwordService.hashPassword.mockResolvedValue('hashed-password');
    userRepository.create.mockReturnValue(user);
    userRepository.save.mockResolvedValue(user);
    userRepository.findOne.mockResolvedValue({
      id: 10,
      email: input.email,
      username: input.username,
      role: input.role,
      restaurant: { id: input.restaurantId },
    });

    await service.create(input);

    expect(userRepository.create).toHaveBeenCalledWith({
      email: input.email,
      username: input.username,
      role: input.role,
      restaurant: { id: input.restaurantId },
      passwordHash: 'hashed-password',
    });
  });

  it('returns a sanitized user from create without mutating the saved entity', async () => {
    const input: CreateUserInput = {
      email: 'user@example.com',
      password: 'a-secure-password',
      username: 'new-user',
      role: UserRole.Manager,
      restaurantId: 42,
    };
    const savedUser = {
      id: 12,
      email: input.email,
      username: input.username,
      role: input.role,
      restaurant: { id: input.restaurantId },
      passwordHash: 'hashed-password',
    };

    passwordService.hashPassword.mockResolvedValue('hashed-password');
    userRepository.create.mockReturnValue(savedUser);
    userRepository.save.mockResolvedValue(savedUser);
    userRepository.findOne.mockResolvedValue({
      id: savedUser.id,
      email: savedUser.email,
      username: savedUser.username,
      role: savedUser.role,
      restaurant: savedUser.restaurant,
    });

    const result = await service.create(input);

    expect(result).not.toHaveProperty('passwordHash');
    expect(savedUser).toHaveProperty('passwordHash', 'hashed-password');
  });

  it('updates the restaurant relation from the supplied restaurant id', async () => {
    const input = {
      id: 7,
      restaurantId: 42,
    };
    const user = { id: input.id };

    userRepository.findOne.mockResolvedValueOnce(user).mockResolvedValueOnce({
      ...user,
      restaurant: { id: input.restaurantId },
    });
    userRepository.update.mockResolvedValue({ affected: 1 });

    await service.update(input);

    expect(userRepository.update).toHaveBeenCalledWith(input.id, {
      restaurant: { id: input.restaurantId },
    });
  });

  it('updates password hash when password is supplied', async () => {
    const input = {
      id: 7,
      password: 'new-secure-password',
    };
    const user = { id: input.id };

    passwordService.hashPassword.mockResolvedValue('new-hash');
    userRepository.findOne
      .mockResolvedValueOnce(user)
      .mockResolvedValueOnce({ ...user, passwordHash: 'new-hash' });
    userRepository.update.mockResolvedValue({ affected: 1 });

    await service.update(input);

    expect(passwordService.hashPassword).toHaveBeenCalledWith(input.password);
    expect(userRepository.update).toHaveBeenCalledWith(input.id, {
      passwordHash: 'new-hash',
    });
  });

  it('filters out null values from update payload', async () => {
    const input = {
      id: 7,
      role: UserRole.Admin,
      email: null,
      restaurantId: null,
    };
    const user = { id: input.id };

    userRepository.findOne
      .mockResolvedValueOnce(user)
      .mockResolvedValueOnce({ ...user, role: input.role });
    userRepository.update.mockResolvedValue({ affected: 1 });

    await service.update(input as never);

    expect(userRepository.update).toHaveBeenCalledWith(input.id, {
      role: input.role,
    });
  });

  it('skips repository update when there are no effective changes', async () => {
    const input = {
      id: 7,
      email: null,
      restaurantId: null,
      password: '',
    };
    const user = { id: input.id };

    userRepository.findOne
      .mockResolvedValueOnce(user)
      .mockResolvedValueOnce(user);

    await service.update(input as never);

    expect(passwordService.hashPassword).not.toHaveBeenCalled();
    expect(userRepository.update).not.toHaveBeenCalled();
    expect(userRepository.findOne).toHaveBeenCalledTimes(2);
  });
});
