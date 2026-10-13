import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PasswordService } from '../password/password.service';
import { User } from '../../common/entities/user.entity';
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

  async validateUser(username: string, password: string): Promise<User | null> {
    const authUser = await this.userService.findOneForAuthByUserName(username);
    const hashToCompare =
      authUser?.passwordHash ?? this.passwordService.dummyHash;
    const isPasswordCorrect = await this.passwordService.comparePasswords(
      password,
      hashToCompare,
    );

    if (!authUser || !isPasswordCorrect) {
      return null;
    }

    return this.userService.findOne(authUser.id);
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
