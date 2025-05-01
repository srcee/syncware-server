import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MenuItemService } from './menu-item.service';
import { CreateMenuItemInput } from './dto/create-menu-item.input';
import { UpdateMenuItemInput } from './dto/update-menu-item.input';

@Resolver('MenuItem')
export class MenuItemResolver {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Mutation('createMenuItem')
  create(
    @Args('createMenuItemInput') createMenuItemInput: CreateMenuItemInput,
  ) {
    return this.menuItemService.create(createMenuItemInput);
  }

  @Query('menuItem')
  findOne(@Args('id') id: number) {
    return this.menuItemService.findOne(id);
  }

  @Mutation('updateMenuItem')
  update(
    @Args('updateMenuItemInput') updateMenuItemInput: UpdateMenuItemInput,
  ) {
    return this.menuItemService.update(
      updateMenuItemInput.id,
      updateMenuItemInput,
    );
  }

  @Mutation('deleteMenuItem')
  delete(@Args('id') id: number) {
    return this.menuItemService.delete(id);
  }
}
