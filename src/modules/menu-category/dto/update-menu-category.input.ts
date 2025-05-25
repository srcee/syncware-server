import { InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuCategoryInput } from './create-menu-category.input';

@InputType()
export class UpdateMenuCategoryInput extends PartialType(
  CreateMenuCategoryInput,
) {
  id: number;
}
