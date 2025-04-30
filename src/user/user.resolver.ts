import { Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('user')
  findAll() {
    return this.userService.findAll();
  }
}
