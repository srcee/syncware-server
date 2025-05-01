import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RestaurantTableService } from './restaurant-table.service';
import { CreateRestaurantTableInput } from './dto/create-restaurant-table.input';
import { UpdateRestaurantTableInput } from './dto/update-restaurant-table.input';

@Resolver('RestaurantTable')
export class RestaurantTableResolver {
  constructor(
    private readonly restaurantTableService: RestaurantTableService,
  ) {}

  @Mutation('createRestaurantTable')
  create(
    @Args('createRestaurantTableInput')
    createRestaurantTableInput: CreateRestaurantTableInput,
  ) {
    return this.restaurantTableService.create(createRestaurantTableInput);
  }

  @Query('restaurantTable')
  findOne(@Args('id') id: number) {
    return this.restaurantTableService.findOne(id);
  }

  @Mutation('updateRestaurantTable')
  update(
    @Args('updateRestaurantTableInput')
    updateRestaurantTableInput: UpdateRestaurantTableInput,
  ) {
    return this.restaurantTableService.update(
      updateRestaurantTableInput.id,
      updateRestaurantTableInput,
    );
  }

  @Mutation('removeRestaurantTable')
  remove(@Args('id') id: number) {
    return this.restaurantTableService.delete(id);
  }
}
