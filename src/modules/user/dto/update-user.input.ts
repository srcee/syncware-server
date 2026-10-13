import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsOptional, MinLength, IsInt, Min } from 'class-validator';
import { UserRole } from '../../../common/entities/user.entity';

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  id!: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(12)
  password?: string;

  @Field({ nullable: true })
  @IsOptional()
  username?: string;

  @Field(() => UserRole, { nullable: true })
  @IsOptional()
  role?: UserRole;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  restaurantId?: number;
}
