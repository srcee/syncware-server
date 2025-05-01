import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(input: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(input);

    return await this.userRepository.save(user);
  }

  async update(id: number, input: UpdateUserInput): Promise<User | null> {
    const user = await this.findOne(id);

    if (!user) {
      return null;
    }

    Object.assign(user, input);

    return await this.userRepository.save(user);
  }

  async delete(id: number): Promise<boolean> {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('user does not exist');
    }

    Object.assign(user, { isActive: false });

    await this.userRepository.save(user);

    return true;
  }
}
