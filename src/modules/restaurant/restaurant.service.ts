import { Injectable } from '@nestjs/common';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async findOne(id: number): Promise<Restaurant | null> {
    return this.restaurantRepository.findOne({ where: { id } });
  }

  async create(input: CreateRestaurantInput): Promise<Restaurant> {
    const restaurant = this.restaurantRepository.create(input);

    return await this.restaurantRepository.save(restaurant);
  }

  async update(
    id: number,
    input: UpdateRestaurantInput,
  ): Promise<Restaurant | null> {
    const restaurant = await this.findOne(id);

    if (!restaurant) {
      return null;
    }

    Object.assign(restaurant, input);

    return await this.restaurantRepository.save(restaurant);
  }

  async delete(id: number): Promise<boolean> {
    const restaurant = await this.findOne(id);

    if (!restaurant) {
      throw new Error('Restaurant does not exist');
    }

    Object.assign(restaurant, { isActive: false });

    await this.restaurantRepository.save(restaurant);

    return true;
  }
}
