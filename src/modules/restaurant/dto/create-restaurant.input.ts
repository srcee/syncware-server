import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantInput {
  @Field()
  name: string;

  @Field()
  location: string;

  @Field(() => Number)
  organizationId: number;

  @Field(() => [Number], { nullable: true })
  tableIds?: number[];

  @Field(() => [Number], { nullable: true })
  userIds?: number[];
}
