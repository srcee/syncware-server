import { Field, InputType, Int, Float } from '@nestjs/graphql';
import { MenuItemPreparationArea } from 'src/graphql/graphql';

@InputType()
export class CreateMenuItemInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  categoryId: number;

  @Field({ defaultValue: true })
  isAvailable?: boolean;

  @Field(() => MenuItemPreparationArea)
  preparationArea: MenuItemPreparationArea;
}
