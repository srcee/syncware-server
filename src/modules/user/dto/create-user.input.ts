import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsInt, IsNotEmpty, Min, MinLength } from 'class-validator';
import { UserRole } from '../../../common/entities/user.entity';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @MinLength(12)
  password!: string;

  @Field()
  @IsNotEmpty()
  username!: string;

  @Field(() => UserRole)
  role!: UserRole;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  restaurantId!: number;
}
