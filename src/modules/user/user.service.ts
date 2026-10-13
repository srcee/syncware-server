import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNil } from 'lodash';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Repository } from 'typeorm';
import { User } from '../../common/entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { PasswordService } from '../password/password.service';

export type AuthUser = Pick<User, 'id' | 'username' | 'email' | 'role'> & {
  passwordHash: string;
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {}

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['updatedBy'],
    });
  }

  async findOneForAuthByUserName(username: string): Promise<AuthUser | null> {
    return this.userRepository.findOne({
      where: { username },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        passwordHash: true,
      },
    });
  }

  async create(input: CreateUserInput): Promise<User> {
    const { password, restaurantId, ...restInput } = input;
    const passwordHash = await this.passwordService.hashPassword(password);

    const user = this.userRepository.create({
      ...restInput,
      restaurant: { id: restaurantId },
      passwordHash,
    });
    const saved = await this.userRepository.save(user);
    const createdUser = await this.findOne(saved.id);

    if (!createdUser) {
      throw new Error('failed to load created user');
    }

    return createdUser;
  }

  async update(input: UpdateUserInput): Promise<User | null> {
    const { password, id, restaurantId, ...restInput } = input;
    const user = await this.findOne(id);

    if (!user) {
      return null;
    }

    const patch: QueryDeepPartialEntity<User> = Object.fromEntries(
      Object.entries(restInput).filter(([, value]) => !isNil(value)),
    );

    if (!isNil(restaurantId)) {
      patch.restaurant = { id: restaurantId };
    }

    if (password) {
      patch.passwordHash = await this.passwordService.hashPassword(password);
    }

    if (Object.keys(patch).length > 0) {
      await this.userRepository.update(id, patch);
    }

    return this.findOne(id);
  }

  async delete(id: number): Promise<boolean> {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('user does not exist');
    }

    await this.userRepository.update(id, { archived: true });

    return true;
  }
}
