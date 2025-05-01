import { CreateRestaurantTableInput } from './create-restaurant-table.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateRestaurantTableInput extends PartialType(
  CreateRestaurantTableInput,
) {
  id: number;
}
