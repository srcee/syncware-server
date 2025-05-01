import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateOrganizationInput {
  @Field()
  name: string;

  @Field(() => ID)
  restaurantId: number;
}
