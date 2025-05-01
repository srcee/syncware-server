import { Injectable } from '@nestjs/common';
import { CreateMenuItemInput } from './dto/create-menu-item.input';
import { UpdateMenuItemInput } from './dto/update-menu-item.input';
import { MenuItem } from './entities/menu-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MenuItemService {
  constructor(
    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>,
  ) {}

  async create(input: CreateMenuItemInput): Promise<MenuItem> {
    const menuItem = this.menuItemRepository.create(input);

    return this.menuItemRepository.save(menuItem);
  }

  async findOne(id: number): Promise<MenuItem | null> {
    return this.menuItemRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    input: UpdateMenuItemInput,
  ): Promise<MenuItem | null> {
    const menuItem = await this.findOne(id);

    if (!menuItem) {
      return null;
    }

    Object.assign(menuItem, input);

    return await this.menuItemRepository.save(menuItem);
  }

  async delete(id: number): Promise<boolean> {
    const menuItem = await this.findOne(id);

    if (!menuItem) {
      throw new Error('Menu Item does not exist');
    }

    await this.menuItemRepository.delete(id);

    return true;
  }
}
