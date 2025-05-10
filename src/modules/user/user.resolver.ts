import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, UserRole } from '../../common/entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Roles } from 'src/common/decorators/roles.decorator';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRole.Admin)
  @Query(() => User, { name: 'user' })
  async findOne(@Args('id') id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput')
    createUserInput: CreateUserInput,
  ) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput')
    updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(updateUserInput);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: number) {
    return await this.userService.delete(id);
  }
}
