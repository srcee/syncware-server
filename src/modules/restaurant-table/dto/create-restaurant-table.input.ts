import { Field, ID, InputType } from '@nestjs/graphql';
import { RestaurantTableStatus } from 'src/modules/restaurant-table/entities/restaurant-table.entity';

@InputType()
export class CreateRestaurantTableInput {
  @Field()
  tableName: string;

  @Field()
  seats: number;

  @Field(() => RestaurantTableStatus)
  status: RestaurantTableStatus;

  @Field(() => ID)
  restaurantId: number;
}
