import { Injectable } from '@nestjs/common';
import { CreateRestaurantTableInput } from './dto/create-restaurant-table.input';
import { UpdateRestaurantTableInput } from './dto/update-restaurant-table.input';
import { RestaurantTable } from './entities/restaurant-table.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantTableService {
  constructor(
    @InjectRepository(RestaurantTable)
    private readonly restaurantTableRepository: Repository<RestaurantTable>,
  ) {}

  async findOne(id: number): Promise<RestaurantTable | null> {
    return this.restaurantTableRepository.findOne({ where: { id } });
  }

  async create(input: CreateRestaurantTableInput): Promise<RestaurantTable> {
    const restaurantTable = this.restaurantTableRepository.create(input);

    return await this.restaurantTableRepository.save(restaurantTable);
  }

  async update(
    id: number,
    input: UpdateRestaurantTableInput,
  ): Promise<RestaurantTable | null> {
    const restaurantTable = await this.findOne(id);

    if (!restaurantTable) {
      return null;
    }

    Object.assign(restaurantTable, input);

    return await this.restaurantTableRepository.save(restaurantTable);
  }

  async delete(id: number): Promise<boolean> {
    const restaurantTable = await this.findOne(id);

    if (!restaurantTable) {
      throw new Error('RestaurantTable does not exist');
    }

    Object.assign(restaurantTable, { isActive: false });

    await this.restaurantTableRepository.save(restaurantTable);

    return true;
  }
}
