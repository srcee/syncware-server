import { Injectable } from '@nestjs/common';
import { CreateMenuCategoryInput } from './dto/create-menu-category.input';
import { UpdateMenuCategoryInput } from './dto/update-menu-category.input';
import { MenuCategory } from './entities/menu-category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MenuCategoryService {
  constructor(
    @InjectRepository(MenuCategory)
    private readonly menuCategoryRepository: Repository<MenuCategory>,
  ) {}

  async create(input: CreateMenuCategoryInput): Promise<MenuCategory> {
    const menuCategory = this.menuCategoryRepository.create(input);

    return this.menuCategoryRepository.save(menuCategory);
  }

  async findOne(id: number): Promise<MenuCategory | null> {
    return this.menuCategoryRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    input: UpdateMenuCategoryInput,
  ): Promise<MenuCategory | null> {
    const menuCategory = await this.findOne(id);

    if (!menuCategory) {
      return null;
    }

    Object.assign(menuCategory, input);

    return await this.menuCategoryRepository.save(menuCategory);
  }

  async delete(id: number): Promise<boolean> {
    const menuCategory = await this.findOne(id);

    if (!menuCategory) {
      throw new Error('Menu Category does not exist');
    }

    await this.menuCategoryRepository.delete(id);

    return true;
  }
}
