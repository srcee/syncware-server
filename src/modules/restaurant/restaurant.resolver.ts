import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';

@Resolver('Restaurant')
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation('createRestaurant')
  create(
    @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput,
  ) {
    return this.restaurantService.create(createRestaurantInput);
  }

  @Query('restaurant')
  findOne(@Args('id') id: number) {
    return this.restaurantService.findOne(id);
  }

  @Mutation('updateRestaurant')
  update(
    @Args('updateRestaurantInput') updateRestaurantInput: UpdateRestaurantInput,
  ) {
    return this.restaurantService.update(
      updateRestaurantInput.id,
      updateRestaurantInput,
    );
  }

  @Mutation('deleteRestaurant')
  delete(@Args('id') id: number) {
    return this.restaurantService.delete(id);
  }
}
