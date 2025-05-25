import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantInput } from './create-restaurant.input';

export class UpdateRestaurantInput extends PartialType(CreateRestaurantInput) {
  id: number;
}
