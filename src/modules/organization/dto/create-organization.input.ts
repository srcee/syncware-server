import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateOrganizationInput {
  @Field()
  name: string;

  @Field(() => ID)
  restaurantId: number;
}
