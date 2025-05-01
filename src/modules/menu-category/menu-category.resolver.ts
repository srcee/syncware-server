import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MenuCategoryService } from './menu-category.service';
import { CreateMenuCategoryInput } from './dto/create-menu-category.input';
import { UpdateMenuCategoryInput } from './dto/update-menu-category.input';

@Resolver('MenuCategory')
export class MenuCategoryResolver {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Mutation('createMenuCategory')
  create(
    @Args('createMenuCategoryInput')
    createMenuCategoryInput: CreateMenuCategoryInput,
  ) {
    return this.menuCategoryService.create(createMenuCategoryInput);
  }

  @Query('menuCategory')
  findOne(@Args('id') id: number) {
    return this.menuCategoryService.findOne(id);
  }

  @Mutation('updateMenuCategory')
  update(
    @Args('updateMenuCategoryInput')
    updateMenuCategoryInput: UpdateMenuCategoryInput,
  ) {
    return this.menuCategoryService.update(
      updateMenuCategoryInput.id,
      updateMenuCategoryInput,
    );
  }

  @Mutation('deleteMenuCategory')
  delete(@Args('id') id: number) {
    return this.menuCategoryService.delete(id);
  }
}
