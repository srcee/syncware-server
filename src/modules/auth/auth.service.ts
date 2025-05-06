import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PasswordService } from '../password/password.service';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './strategies/jwt.strategy';
import { LoginResponse } from './dto/login.response';

@Injectable()
export class AuthService {
  constructor(
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
      const { passwordHash, ...userWithoutPassword } = user;
      const isPasswordCorrect = await this.passwordService.comparePasswords(
        password,
        passwordHash,
      );

      if (isPasswordCorrect) {
        return userWithoutPassword;
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
