import { Module } from '@nestjs/common';
import { RestaurantTableService } from './restaurant-table.service';
import { RestaurantTableResolver } from './restaurant-table.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantTable } from './entities/restaurant-table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantTable])],
  providers: [RestaurantTableResolver, RestaurantTableService],
})
export class RestaurantTableModule {}
