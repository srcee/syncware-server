import { InputType } from '@nestjs/graphql';
import { CreateMenuCategoryInput } from './create-menu-category.input';
import { PartialType } from '@nestjs/mapped-types';

@InputType()
export class UpdateMenuCategoryInput extends PartialType(
  CreateMenuCategoryInput,
) {
  id: number;
}
