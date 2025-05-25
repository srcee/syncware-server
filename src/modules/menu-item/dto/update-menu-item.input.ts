import { InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuItemInput } from './create-menu-item.input';

@InputType()
export class UpdateMenuItemInput extends PartialType(CreateMenuItemInput) {
  id: number;
}
