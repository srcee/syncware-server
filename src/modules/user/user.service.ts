import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../common/entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { PasswordService } from '../password/password.service';

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

  async findOneByUserName(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(input: CreateUserInput): Promise<User> {
    const { password, ...restInput } = input;
    const passwordHash = await this.passwordService.hashPassword(password);

    const user = this.userRepository.create({ ...restInput, passwordHash });

    return await this.userRepository.save(user);
  }

  async update(input: UpdateUserInput): Promise<User | null> {
    const { password, id, ...restInput } = input;
    const user = await this.findOne(id);

    if (!user) {
      return null;
    }

    const userData = this.userRepository.create({ ...user, ...restInput });

    if (password) {
      const passwordHash = await this.passwordService.hashPassword(password);
      userData.passwordHash = passwordHash;
    }

    return await this.userRepository.save(userData);
  }

  async delete(id: number): Promise<boolean> {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('user does not exist');
    }

    await this.userRepository.save({ ...user, archived: false });

    return true;
  }
}
