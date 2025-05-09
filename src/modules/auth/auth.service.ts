import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PasswordService } from '../password/password.service';
import { User } from '../../common/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './strategies/jwt.strategy';
import { LoginResponse } from './dto/login.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private userService: UserService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'passwordHash'> | null> {
    const user = await this.userService.findOneByUserName(username);

    if (user) {
      // Remove passwordHash and return a User instance
      const { passwordHash, ...userWithoutPassword } = user;

      const isPasswordCorrect = await this.passwordService.comparePasswords(
        password,
        passwordHash,
      );

      if (isPasswordCorrect) {
        return this.userRepository.create(userWithoutPassword);
      }
    }

    return null;
  }

  login(user: User): LoginResponse {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
