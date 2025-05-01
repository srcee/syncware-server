import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMenuCategoryInput {
  @Field()
  name: string;

  @Field(() => Int)
  restaurantId: number;

  @Field(() => [Int], { nullable: true })
  itemIds?: number[];
}
