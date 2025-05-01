import { InputType } from '@nestjs/graphql';
import { CreateMenuItemInput } from './create-menu-item.input';
import { PartialType } from '@nestjs/mapped-types';

@InputType()
export class UpdateMenuItemInput extends PartialType(CreateMenuItemInput) {
  id: number;
}
