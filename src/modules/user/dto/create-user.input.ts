import { Field, InputType } from '@nestjs/graphql';
import { UserRole } from 'src/modules/user/entities/user.entity';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  username: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field(() => Number)
  restaurantId: number;
}
